import { palette } from "./vars.js";

/** 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {import("./logic.js").Game} game
 * @param {number} pxd - Pixel Density
 */
export const draw = (ctx, game, pxd) => {
  // Clear frame
  ctx.fillStyle = palette.backgroundColor;
  ctx.fillRect(0, 0, game.size.w * pxd, game.size.h * pxd);

  // Draw walls
  ctx.beginPath();
  ctx.fillStyle = palette.wallColor;
  for (let x = 0; x < game.size.w; x++) for (let y = 0; y < game.size.h; y++) {
    if (game.walls[x][y]) {
      ctx.rect(x * pxd, y * pxd, pxd, pxd);
    }
  }
  ctx.fill();

  // Draw food
  ctx.beginPath();
  ctx.fillStyle = palette.foodColor;
  const r = pxd * 0.4;
  for (let food of game.foods) {
    ctx.beginPath();
    ctx.arc(
      food.x * pxd + pxd / 2,
      food.y * pxd + pxd / 2,
      r,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Draw snake
  ctx.beginPath();
  ctx.fillStyle = palette.snakeHeadColor;
  ctx.fillRect(game.snake[0].x * pxd, game.snake[0].y * pxd, pxd, pxd);

  ctx.beginPath();
  ctx.fillStyle = palette.snakeColor;
  for (let i = 1; i < game.snake.length; i++) {
    ctx.rect(game.snake[i].x * pxd, game.snake[i].y * pxd, pxd, pxd);
  }
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = palette.color;
  ctx.font = `${pxd * 2}px sans`;
  ctx.textAlign = "center";

  const w = Math.floor(game.size.w * pxd / 3);
  ctx.fillText(`Score: ${game.score}`, w, 1.5 * pxd);
  ctx.fillText(`Speed: ${(1000 / game.speed).toFixed(2).padStart(5, " ")}/${game.speed}`, w * 2, 1.5 * pxd);
}
