import { iGame, iPos, iHeroShot, iEnemyShip, iHeroShip, config } from './constants';
import { Observable, Subject } from 'rxjs';
import { stars$Fac } from './stars';
import { heroShip$Fac } from './hero-ship';
import { heroShots$Fac } from './hero-shots';
import { enemyShips$Fac } from './enemy-ships';
import { enemyShots$Fac } from './enemy-shots';

const collided = (a: iPos, b: iPos): boolean => {
  return (Math.abs(a.x - b.x) < 10 && Math.abs(a.y - b.y) < 1) ? true : false;
}

const testCollision = (game: iGame): iGame => {
  let heroShots = game.actors.heroShots;
  let enemyShips = game.actors.enemyShips;
  let heroShip = game.actors.heroShip;
  let enemyShots = game.actors.enemyShots;

  // test each heroShot with each enemyShip
  for(let i = 0; i < heroShots.length; i++) {
    for(let j = 0; j < enemyShips.length; j++) {
      if (collided(heroShots[i], enemyShips[j])) {
        heroShots[i].collided = true;
        enemyShips[j].collided = true;
        break;
      }
    }
  }

  heroShots.forEach((heroShot, index, arr) => {
    if (heroShot.collided) {
      arr.splice(index, 1);
    }
  });

  enemyShips.forEach((enemyShip, index, arr) => {
    if (enemyShip.collided) {
      arr.splice(index, 1);
    }
  });

  // test each enemyShip with heroShip
  for(let i = 0; i < enemyShips.length; i++) {
    if (!enemyShips[i].collided) {
      if(collided(enemyShips[i], heroShip)) {
        enemyShips[i].collided = true;
        heroShip.collided = true;
        console.log('game over');
      }
    }
  }

  // test each enemyShot with heroShip
  for(let i = 0; i < enemyShots.length; i++) {
    if (!enemyShots[i].collided) {
      if(collided(enemyShots[i], heroShip)) {
        enemyShots[i].collided = true;
        heroShip.collided = true;
        console.log('game over');
      }
    }
  }

  return game;
}

export default (game: iGame): Observable<iGame> => {
  const heroShip$ = heroShip$Fac(game.actors.heroShip);
  const enemyShips$ = <Subject<iEnemyShip[]>>(new Subject());
  enemyShips$Fac(game.actors.enemyShips).subscribe(enemyShips$);
  return Observable.combineLatest(
    stars$Fac(game.actors.stars),
    heroShip$,
    heroShots$Fac(heroShip$, game.actors.heroShots),
    enemyShips$,
    enemyShots$Fac(enemyShips$, game.actors.enemyShots),
    (stars, heroShip, heroShots, enemyShips, enemyShots) => {
      return Object.assign(game, {
        actors: {
          stars,
          heroShip,
          heroShots,
          enemyShips,
          enemyShots
        }
      })
    }
  )
  .map(game => {
    return testCollision(game);
  })
  .throttleTime(config.canvas.refreshInterval)
};