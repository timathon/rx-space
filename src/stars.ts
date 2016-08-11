import { Observable } from 'rxjs';
import { config, iStar } from './constants';

const starsInit$Fac = (stars: iStar[]): Observable<iStar[]> => {
  if (stars.length === 0) { // at START_CLICKED, generate a starsInit$
    return Observable.range(1, config.stars.count)
      .map(item => {
        const size = 1 + Math.random() * 1.5;
        const speed = size > 1.6 ? 0.25 : 0.05;
        const color = '#ffffff'; // whilte
        return {
          x: Math.random() * config.canvas.width,
          y: Math.random() * config.canvas.height,
          size: size,
          speed: speed,
          color: color
        }
      })
      .toArray()
  }
  if (stars.length > 0) { // at CONTINUE_CLICKED, use the stars in the game state
    return Observable.of(stars);
  }
}

const starsMove$Fac = (stars: iStar[]): Observable<iStar[]> => {
  return Observable.interval(config.stars.moveInterval)
    .map(tick => {
      stars.forEach(star => {
        star.y += star.speed
        if (star.y > config.canvas.height) {
          star.y -= config.canvas.height;
        }
        const shouldChangeColor = Math.random() > 0.95 ? true : false; // the probability of executing color change is 5%; but still color may remain the same;
        star.color = shouldChangeColor ? config.stars.colors[
            Math.floor(Math.random() * config.stars.colors.length)
          ] : star.color;
      })
      return stars
    })
    .startWith(stars); // begin emitting stars at time 0, not at (0 + config.stars.moveInterval)
}

export const stars$Fac = (stars: iStar[]): Observable<iStar[]> => {
  return starsInit$Fac(stars)
    .mergeMap(starsMove$Fac)
}
