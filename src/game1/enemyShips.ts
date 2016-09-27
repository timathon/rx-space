import { Observable } from 'rxjs';
import { iEnemyShip, config } from './shared';

export const enemyShips$Fac = (enemyShips: iEnemyShip[]): Observable<iEnemyShip[]> => {
    // return Observable.of([])
  return Observable.interval(config.enemyShip.dispatchInterval)
    .scan((acc, tick) => {
      const newEnemy = {
        x: Math.random() * config.canvas.width,
        y: 0,
        directionOnX: Math.random() > 0.5 ? 1 : -1
      }
      acc.push(newEnemy)
      return acc
    }, enemyShips)
    .startWith(enemyShips)
    .switchMap(enemyShips => {
      return Observable.interval(config.commons.moveInterval)
        .map(tick => {
          enemyShips.forEach((enemyShip, index, enemyShips) => {
            if(enemyShip.x>config.canvas.width || enemyShip.x < 0) {
              enemyShip.directionOnX = enemyShip.directionOnX * -1;
            }
            enemyShip.x += config.enemyShip.moveSpeed.x * enemyShip.directionOnX;
            enemyShip.y += config.enemyShip.moveSpeed.y;
            if (enemyShip.y > config.canvas.height + config.enemyShip.halfBottomLength) {
              enemyShips.splice(index, 1);
            }
          })
          return enemyShips;
        })
    })
}