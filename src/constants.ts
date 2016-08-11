export interface iPos {
  x: number;
  y: number;
}

export interface iStar extends iPos {
  size: number;
  speed: number;
  color: string;
}

export interface iHeroShip extends iPos {
  collided: boolean;
}

export interface iHeroShot extends iPos {
  collided: boolean;
}

export interface iEnemyShip extends iPos {
  speed: number;
  collided: boolean;
}

export interface iEnemyShot extends iPos {
  speed: number;
  collided: boolean;
}


export interface iGame {
  val?: number;
  actors: {
    stars: iStar[];
    heroShip: iHeroShip;
    heroShots: iHeroShot[];
    enemyShips: iEnemyShip[];
    enemyShots: iEnemyShot[];
  };
  startTime?: Date;
  running: boolean;

}

export const START = 'START';
export const RESTART = 'RESTART';
export const PAUSE = 'PAUSE';
export const CONTINUE = 'CONTINUE';
export const PAUSE_CLICKED = 'PAUSE_CLICKED';
export const CONTINUE_CLICKED = 'CONTINUE_CLICKED';

export const config = {
  canvas: {
    width: 300,
    height: 300,
    refreshInterval: 5
  },
  stars: {
    moveInterval: 30,
    count: 150,
    colors: [
      // '#000000',
      // '#191919',
      // '#323232',
      // '#4c4c4c',
      // '#666666',
      // '#7f7f7f',
      // '#999999',
      '#b2b2b2',
      '#cccccc',
      // '#e5e5e5',
      '#ffffff'
    ]
  },
  heroShip: {
    halfBottomLength: 20,
    color: '#2c6ed0',
    moveInterval: 5,
    speedX: 1
  },
  heroShot: {
    halfBottomLength: 8,
    color: '#2c6ed0',
    moveInterval: 5,
    speedY: 0.8
  },
  enemyShip: {
    generationInterval: 1000,
    halfBottomLength: 12,
    color: '#ffd700',
    moveInterval: 5,
    speedYInit: 0.3
  },
  enemyShot: {
    generationInterval: 500,
    halfBottomLength: 5,
    color: '#ffd700',
    moveInterval: 5,
    speedYInit: 0.5
  }
}


export const container = document.querySelector('#container');
container.setAttribute('width', config.canvas.width + 'px');
container.setAttribute('height', config.canvas.height + 'px');


export const canvas = document.createElement('canvas');
export const ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = config.canvas.width;
canvas.height = config.canvas.height;

export const startButton = <HTMLInputElement> document.querySelector('#start');
export const pauseButton = <HTMLInputElement> document.querySelector('#pause');
