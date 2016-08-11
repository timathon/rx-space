import {
  config,
  iEnemyShot,
  iEnemyShip,
} from './constants'

import { Observable } from 'rxjs';


export const enemyShots$Fac = (enemyShips$: Observable<iEnemyShip[]>, enemyShots: iEnemyShot[]): Observable<iEnemyShot[]> => {
  return Observable.interval(config.enemyShot.generationInterval)
    .withLatestFrom(enemyShips$)
    .scan((acc, combo) => {
      let genTick = combo[0];
      let enemyShips = combo[1];
      if (enemyShips.length === 0) {return [...acc]}
      
      let shouldGenerate = false;
      let speed = config.enemyShot.speedYInit;

      switch(true) {
        case genTick < 30:
          if (Math.random() > 0.4) { // 60% chance, there will be a new enemyShip on each prodTick
            shouldGenerate = true;
          }
          break;
        case genTick >=30 && genTick < 90:
          if (Math.random() > 0.2) { // 80% chance, there will be a new enemyShip on each prodTick
            shouldGenerate = true;
            speed *= 1.3;
          }
          break;
        case genTick >= 90:
          shouldGenerate = true; // 100% chance, there will be a new enemyShip on each prodTick
          speed *= 2;
          break;
        default:
          break;
      }

      if (shouldGenerate) {
        let shootingEnemyShip = enemyShips[Math.floor(Math.random()*enemyShips.length)]
        let newEnemyShot = {
          x: shootingEnemyShip.x,
          y: shootingEnemyShip.y,
          speed: speed,
          collided: false
        }
        acc.push(newEnemyShot);
        return [...acc, newEnemyShot]
      } else {
        return [...acc]
      }
    }, enemyShots)
    .switchMap(enemyShots => {
      return Observable.interval(config.enemyShot.moveInterval)
        .map(moveTick => {
          enemyShots.forEach((enemyShot, index, arr) => {
            enemyShot.y += enemyShot.speed;
            if (enemyShot.y > config.canvas.height + config.enemyShot.halfBottomLength) {
              arr.splice(index, 1);
            }
          })
          return enemyShots;
        })
    })
    .startWith(enemyShots);
}