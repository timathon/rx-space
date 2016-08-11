
import { Observable } from 'rxjs';
import { 
  config,
  iGame, 
  PAUSE, PAUSE_CLICKED, CONTINUE, CONTINUE_CLICKED, RESTART,
  startButton, pauseButton
} from './constants';
import onContinue$Fac from './on-continue'

const gameInit: iGame = {
  val: 0,
  actors: {
    stars: [],
    heroShip: { x: config.canvas.width / 2, y: config.canvas.height - 30, collided: false },
    heroShots: [],
    enemyShips: [],
    enemyShots: []
  },
  running: true
}

const pauseButtonClick$ = Observable.fromEvent(pauseButton, 'click')


const tabVisibilityChange$ = Observable.fromEvent(document, 'visibilitychange')
  .filter(event => document.visibilityState === 'hidden')

const pauseContinueEvent$ = Observable.merge(pauseButtonClick$, tabVisibilityChange$)
  .scan((lastEvent, event) => {
    switch (lastEvent) {
      case CONTINUE_CLICKED: 
        pauseButton.textContent = CONTINUE;
        return PAUSE_CLICKED;
      case PAUSE_CLICKED:
        pauseButton.textContent = PAUSE;
        return CONTINUE_CLICKED;
      default:
        break;
    }
  }, CONTINUE_CLICKED)
  .startWith(CONTINUE_CLICKED)


const onPause$Fac = (game: iGame) => {
  return Observable.of(game);
}

export const game$: Observable<iGame> = Observable.fromEvent(startButton, 'click')
  .switchMap(event => {
    /* init setup - start */
    startButton.textContent = RESTART;
    pauseButton.textContent = PAUSE;
    pauseButton.disabled = false;
    gameInit.startTime = new Date(Date.now());
    let game = gameInit;
    /* init setup - end */
    return pauseContinueEvent$
      .switchMap(event => {
        switch (event) {
          case CONTINUE_CLICKED:
            return onContinue$Fac(game);
          case PAUSE_CLICKED:
            return onPause$Fac(game);
          // default:
            // return Observable.of(game);
        }
      });
  })
