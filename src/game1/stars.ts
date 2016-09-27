import { Observable, TestScheduler } from 'rxjs/Rx';
import { config, iStar } from './shared';

export const stars$Fac = (stars: iStar[], scheduler?: TestScheduler): Observable<iStar[]> => {
  return Observable.interval(config.star.moveInterval, scheduler)
    .map(tick => {
      return stars.map(star => {
        star.y += config.star.moveSpeed.y;
        if(star.y > config.canvas.height) {
          star.y = star.y - config.canvas.height;
        }
        return star
      })
    })
}