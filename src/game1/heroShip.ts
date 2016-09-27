import { Observable } from 'rxjs';
import { iHeroShip, canvas, config } from './shared';

export const heroShip$Fac = (heroShip: iHeroShip): Observable<iHeroShip> => {
  return Observable.fromEvent(canvas, 'mousemove')
    .switchMap((event: {clientX: number}) => {
      return Observable.interval(config.commons.moveInterval)
        .map(tick => {
          const mouseTipOnCanvas = event.clientX - 8 - config.canvas.margin
          if(heroShip.x < mouseTipOnCanvas) {
            heroShip.x += config.heroShip.moveSpeed.x
          }
          if(heroShip.x > mouseTipOnCanvas) {
            heroShip.x -= config.heroShip.moveSpeed.x
          }
          return heroShip;
        })
    })
    .startWith(heroShip)
}

