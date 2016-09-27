import { Observable } from 'rxjs';
import { iHeroShip, iHeroShot, canvas, config } from './shared';

export const heroShots$Fac = (heroShots: iHeroShot[], heroShip$: Observable<iHeroShip>): Observable<iHeroShot[]> => {
  return Observable.fromEvent(canvas, 'click')
    .throttleTime(100)
    .withLatestFrom(heroShip$, (event, heroShip) => heroShip)
    .scan((acc, heroShip) => {
      acc.push(Object.assign({}, heroShip))
      return acc
    }, heroShots)
    .startWith(heroShots)
    .switchMap(heroShots => {
      return Observable.interval(config.commons.moveInterval)
        .map(tick => {
          // return heroShots.reduce((newHeroShots, heroShot) => {
          //   heroShot.y -= config.heroShot.moveSpeed.y;
          //   if (heroShot.y >= 0 - config.heroShot.halfBottomLength) {
          //     newHeroShots.push(Object.assign({}, heroShot));
          //   }
          //   return newHeroShots;
          // }, []);
          heroShots.forEach((heroShot, index, heroShots) => {
            heroShot.y -= config.heroShot.moveSpeed.y;
            if (heroShot.y <= 0 - config.heroShot.halfBottomLength) {
              heroShots.splice(index, 1);
            }
          })
          return heroShots
        })
    })
    .startWith(heroShots)
}
