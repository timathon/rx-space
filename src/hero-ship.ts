import { Observable } from 'rxjs';
import {
  config,
  iHeroShip,
  canvas
} from './constants';

export const heroShip$Fac = (heroShip: iHeroShip): Observable<iHeroShip> => {
  return Observable.fromEvent(canvas, 'mousemove')
    .switchMap((event: {clientX: number;})=> {
      return Observable.interval(config.heroShip.moveInterval)
        .map(tick => {
          const mouseTipX = event.clientX - 7
          switch (true) {
            case mouseTipX < heroShip.x:
              return Object.assign(heroShip, {x: heroShip.x - config.heroShip.speedX})
            case heroShip.x < mouseTipX:
              return Object.assign(heroShip, {x: heroShip.x + config.heroShip.speedX})
            default:
              return heroShip;
          }
        })
    })
    .startWith(heroShip);
}

