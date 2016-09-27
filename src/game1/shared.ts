import { BehaviorSubject, Observable } from 'rxjs';
import { onContinue$Fac } from './on-continue';

export interface iPosition {
  x: number;
  y: number;
}

export interface iStar extends iPosition{
  size: number;
  speed: number;
  color: string;
}

export interface iHeroShip extends iPosition {

}

export interface iHeroShot extends iPosition {

}

export interface iEnemyShip extends iPosition {
  directionOnX: number;
}

export interface iActors {
  stars: iStar[];
  heroShip: iHeroShip;
  heroShots: iHeroShot[];
  enemyShips: iEnemyShip[];
}

export interface iGame {
  actors: iActors;
  paused: boolean;
  firstRun: boolean;
  gameOver: boolean;
}


export const config = {
  commons: {
    moveInterval: 5,
    collisionDist: 6
  },
  canvas: {
    width: 300,
    height: 300,
    margin: 10
  },
  star: {
    count: 100,
    moveInterval: 20,
    moveSpeed: {x: 0, y: 0.5}
  },
  heroShip: {
    halfBottomLength: 20,
    color: '#2c6ed0',
    moveSpeed: {x: 2, y: 0}
  },
  heroShot: {
    halfBottomLength: 8,
    color: '#2c6ed0',
    moveSpeed: {x: 0, y: 1}
  },
  enemyShip: {
    halfBottomLength: 12,
    color: '#ffd700',
    moveSpeed: {x: 0.2, y: 0.4},
    dispatchInterval: 1000
  },

}


const starsInit = (): iStar[] => {
  return Array.from({length: config.star.count}, (v, i) => {
    return {
      x: Math.random() * config.canvas.width,
      y: Math.random() * config.canvas.height,
      size: 1 + Math.random() * 1.5,
      speed: [0.25, 0.05][Math.floor(Math.random()*2)],
      color:  '#ffffff' // whilte
    }
  })
}

export const actorsInit = (): iActors => {
  return {
    stars: starsInit(),
    heroShip: {
      x: config.canvas.width/2,
      y: config.canvas.height-30,
    },
    heroShots: [],
    enemyShips: []
  }
}

const gameContainer = document.createElement('div');

export const startButton = document.createElement('input');
startButton.value = 'START';
startButton.setAttribute("type", "button");
startButton.style.width = '100px';
startButton.style.margin = '10px';
gameContainer.appendChild(startButton);

export const pauseButton = document.createElement('input');
pauseButton.disabled = true;
pauseButton.value = 'PAUSE';
pauseButton.setAttribute("type", "button");
pauseButton.style.width = '100px';
gameContainer.appendChild(pauseButton);

const canvasContainer = document.createElement('div');
canvasContainer.style.margin = config.canvas.margin + 'px';
export const canvas = document.createElement('canvas');
export const ctx = canvas.getContext('2d');
canvasContainer.appendChild(canvas);
canvas.width = config.canvas.width;
canvas.height = config.canvas.height;
gameContainer.appendChild(canvasContainer);

document.body.appendChild(gameContainer);

export const gameState$$: BehaviorSubject<iGame> = new BehaviorSubject({
  actors: actorsInit(), 
  paused: true, 
  firstRun: true,
  gameOver: false
});

export const gameRun$Fac = (gameState$$: BehaviorSubject<iGame>): Observable<iGame> => {
  return Observable.fromEvent(startButton, 'click')
    .switchMap(event => {
      startButton.value = 'RESTART';
      pauseButton.disabled = false;
      const game = gameState$$.getValue();
      pauseButton.disabled = false;

      if (game.firstRun) {
        game.firstRun = false;
      } else {
        game.actors = actorsInit();
        game.paused = true;
        game.gameOver = false;
      }

      const gameOver$ = gameState$$.pluck('gameOver').distinct().filter(gameOver => gameOver===true);
      const pauseClick$ = Observable.fromEvent(pauseButton, 'click')
      return Observable.merge(gameOver$, pauseClick$)
        .startWith('whatever')
        .switchMap(event => {
          switch(true) {
            case event===true:
              pauseButton.value = 'GAME OVER';
              pauseButton.disabled = true;
              return Observable.of(game)
            default:
              game.paused = !game.paused;
              switch (game.paused) {
                case true:
                  pauseButton.value = 'CONTINUE';
                  return Observable.of(game);
                case false:
                  pauseButton.value = 'PAUSE';
                  return onContinue$Fac(game);
              }
          }
        })
    })
}

export const isCollided = (a: iPosition, b: iPosition): boolean => {
  const dist = Math.pow(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2), 0.5)
  if( dist > config.commons.collisionDist ) {
    return false
  } else {
    return true
  }
}