import {
  config,
  iHeroShot, iHeroShip,
  canvas
} from './constants';
import { Observable } from 'rxjs';

const mouseClick$ = Observable.fromEvent(canvas, 'click');
const spaceKeyPress$ = Observable.fromEvent(document, 'keypress')
  .filter((event: {keyCode: number;}) => {
    return event.keyCode === 0 || event.keyCode === 32
  })

export const heroShots$Fac = (heroShip$: Observable<iHeroShip>, heroShots: iHeroShot[]): Observable<iHeroShot[]> => {
  return Observable.merge(mouseClick$, spaceKeyPress$)
    .throttleTime(100) // at least 100 ms interval between shots
    .withLatestFrom(heroShip$, (event, heroShip) => {
      return <iHeroShot>Object.assign({}, heroShip, {collided: false});
    })
    .scan((acc, heroShot) => {
      acc.push(heroShot);
      return acc;
    }, heroShots)
    .startWith(heroShots)
    .switchMap(heroShots => {
      return Observable.interval(config.heroShot.moveInterval)
        .map(tick => {
          heroShots.forEach((heroShot, index, arr) => {
            heroShot.y -= config.heroShot.speedY;
            if (heroShot.y < 0 - config.heroShot.halfBottomLength) {
              arr.splice(index, 1);
            }
          })
          return heroShots;
        })
    })
}