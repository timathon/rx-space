import { 
  config,
  iGame, iStar, iHeroShip, iHeroShot, iEnemyShip, iEnemyShot,
  ctx, canvas
} from './constants';


const renderStars = (stars: iStar[]): void => {
  // fill canvas with black
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw stars
  stars.forEach(star => {
    ctx.fillStyle = star.color;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  })
}

const drawTriangle = (point: {x: number; y: number}, halfBottomLength: number, color: string, up: boolean): void => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(point.x, point.y); // begin with the point
  ctx.lineTo(point.x - halfBottomLength, up ? point.y + halfBottomLength : point.y - halfBottomLength); // to left_down or left_up
  ctx.lineTo(point.x + halfBottomLength, up ? point.y + halfBottomLength : point.y - halfBottomLength); // to right
  ctx.lineTo(point.x, point.y); // to the point
  ctx.fill();
}

const renderHeroShip = (heroShip: iHeroShip): void => {
  drawTriangle(heroShip, config.heroShip.halfBottomLength, config.heroShip.color, true);
}

const renderHeroShots = (heroShots: iHeroShot[]): void => {
  if (heroShots.length > 0) {
    heroShots.forEach(heroShot => {
      drawTriangle(heroShot, config.heroShot.halfBottomLength, config.heroShot.color, true);
    })
  }

}

const renderEnemyShips = (enemyShips: iEnemyShip[]): void => {
  if (enemyShips.length > 0) {
    enemyShips.forEach(enemyShip => {
      drawTriangle(enemyShip, config.enemyShip.halfBottomLength, config.enemyShip.color, false);
    })
  }
}

const renderEnemyShots = (enemyShots: iEnemyShot[]): void => {
  if (enemyShots.length > 0) {
    enemyShots.forEach(enemyShot => {
      drawTriangle(enemyShot, config.enemyShot.halfBottomLength, config.enemyShot.color, false);
    })
  }
}

export default (game: iGame): void => {
  renderStars(game.actors.stars);
  renderHeroShip(game.actors.heroShip);
  renderHeroShots(game.actors.heroShots);
  renderEnemyShips(game.actors.enemyShips);
  renderEnemyShots(game.actors.enemyShots);
}

