import {
  config,
  iEnemyShip
} from './constants';
import { Observable } from 'rxjs';

export const enemyShips$Fac = (enemyShips: iEnemyShip[]): Observable<iEnemyShip[]> => {
  return Observable.interval(config.enemyShip.generationInterval)
    .scan((acc, genTick) => {
      let shouldGenerate = false;
      let speed = config.enemyShip.speedYInit;
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
        let newEnemyShip = {
          x: Math.random() * config.canvas.width,
          y: 0,
          speed: speed,
          collided: false
        }
        return [...acc, newEnemyShip]
      } else {
        return [...acc]
      }
    }, enemyShips)
    .startWith(enemyShips)
    .switchMap(enemyShips => {
      return Observable.interval(config.enemyShip.moveInterval)
        .map(moveTick => {
          enemyShips.forEach((enemyShip, index, arr) => {
            enemyShip.y += enemyShip.speed;
            if (enemyShip.y > config.canvas.height + config.enemyShip.halfBottomLength) {
              arr.splice(index, 1);
            }
          });
          return enemyShips;
        })
    })

}