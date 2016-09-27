import { config, iGame, iStar, iHeroShip, isCollided } from './shared';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { stars$Fac } from './stars';
import { heroShip$Fac } from './heroShip';
import { heroShots$Fac } from './heroShots';
import { enemyShips$Fac } from './enemyShips';

export const onContinue$Fac = (game: iGame): Observable<iGame> => {
  const stars$ = stars$Fac(game.actors.stars);
  const heroShip$ = heroShip$Fac(game.actors.heroShip);
  const heroShots$ = heroShots$Fac(game.actors.heroShots, heroShip$);
  const enemyShips$ = enemyShips$Fac(game.actors.enemyShips);
  return Observable.combineLatest(
    stars$,
    heroShip$,
    heroShots$,
    enemyShips$,
    (stars, heroShip, heroShots, enemyShips) => {
      // check collide between heroShip and enemyShips
      enemyShips.forEach((enemyShip, index, enemyShips) => {
        const enemyShipLeftTip = {x: enemyShip.x - config.enemyShip.halfBottomLength, y: enemyShip.y - config.enemyShip.halfBottomLength}
        const enemyShipRightTip = {x: enemyShip.x + config.enemyShip.halfBottomLength, y: enemyShip.y - config.enemyShip.halfBottomLength}
        if (
          isCollided(heroShip, enemyShip) || isCollided(heroShip, enemyShipLeftTip) || isCollided(heroShip, enemyShipRightTip) 
        ) {
          game.gameOver = true;
        }
      })
      // check collide between heroShots and enemyShips
      heroShots.forEach((heroShot, index, heroShots) => {
        enemyShips.forEach((enemyShip, jindex, enemyShips) => {
          if (isCollided(heroShot, enemyShip)) {
            enemyShips.splice(jindex, 1);
            heroShots.splice(index, 1);
          }
        })
      })
      return {
        actors: {
          stars,
          heroShip,
          heroShots,
          enemyShips
        },
        paused: game.paused,
        firstRun: game.firstRun,
        gameOver: game.gameOver
      }
    }
  )


}