import { draw } from "./draw.js";
import { Game } from "./logic.js";

const pixelDensity = 10;
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
/** @type {import("./logic.js").Size} */
const size = {
  w: Math.floor(window.innerWidth / pixelDensity),
  h: Math.floor(window.innerHeight / pixelDensity)
}

canvas.width = size.w * pixelDensity;
canvas.height = size.h * pixelDensity;



const calculateSpeed = x => Math.floor((Math.sin(x / 25) + 1) * 100 + 75);

const game = new Game(size);
draw(ctx, game, pixelDensity);

let paused = false;

const tickLoop = () => {
  const result = game.tick();
  const speed = calculateSpeed(game.tickCount);

  if (result) {
    alert(`Game Over! Score: ${game.score}`);
    throw "";
  }
  draw(ctx, game, pixelDensity);

  game.speed = speed;

  console.log(`Tick speed: ${speed}, Score: ${game.score}`)
  if (!paused) setTimeout(tickLoop, speed);
}



window.addEventListener("keydown", e => {
  switch (e.code) {
    case "KeyW": case "ArrowUp": game.trySetDirection("up"); break;
    case "KeyS": case "ArrowDown": game.trySetDirection("down"); break;
    case "KeyA": case "ArrowLeft": game.trySetDirection("left"); break;
    case "KeyD": case "ArrowRight": game.trySetDirection("right"); break;
    case "Space": if (!(paused = !paused)) tickLoop(); break;
  }
});

tickLoop();
