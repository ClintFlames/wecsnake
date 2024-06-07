const range = (x, omin, omax, nmin, nmax) =>
  (((x - omin) * (nmax - nmin)) / (omax - omin)) + nmin;

/**
 * @typedef {{ x: number, y: number}} Point
 * @typedef {{ w: number, h: number }} Size
 * @typedef {"up" | "down" | "left" | "right"} Direction
 */
export class Game {
  score = 0;
  speed = 0;
  tickCount = 0;
  /** @type {Size} */
  size = { x: 0, y: 0 };
  /** @type {Direction} */
  dir = "right";
  /** @type {Array<Point>} */
  snake = [];
  /** @type {Array<Array<boolean>>} */
  walls = [];
  /** @type {Array<Point>} */
  foods = [];

  /**
   * @param {Size} size
   */
  constructor(size) {
    this.size = size;

    this.walls = Array.from(new Array(size.w), _ => Array(size.h).fill(false));
    this.generateWalls();

    for (let i = 0; i < 5; i++) this.spawnFood();

    /** @type {Point} */
    const snakePos = {
      x: Math.floor(size.w / 2),
      y: Math.floor(size.h / 2)
    }

    this.snake.push(snakePos);
    for (let i = 1; i < 5; i++) this.snake.push({ x: snakePos.x - i, y: snakePos.y });
  }

  tick() {
    const predict = { x: this.snake[0].x, y: this.snake[0].y }

    switch (this.dir) {
      case "up": predict.y--; break;
      case "down": predict.y++; break;
      case "left": predict.x--; break;
      case "right": predict.x++; break;
    }

    // Normalize position when out of bounds
    if (predict.x < 0) predict.x = this.size.w + predict.x;
    if (predict.y < 0) predict.y = this.size.h + predict.y;
    if (predict.x >= this.size.w) predict.x = predict.x - this.size.w;
    if (predict.y >= this.size.h) predict.y = predict.y - this.size.h;

    if (this.walls[predict.x][predict.y]) return "wall contact";
    if (this.snake.findIndex(v => v.x == predict.x && v.y == predict.y) != -1) return "snake contact";

    // Move snake
    this.snake.unshift(predict);
    const foodIndex = this.foods.findIndex(v => v.x == predict.x && v.y == predict.y);
    if (foodIndex != -1) {
      this.foods.splice(foodIndex, 1);

      this.score += Math.max(
        Math.floor(range(275 - this.speed, 75, 275, 0, 1) * 10),
        1
      );
    } else {
      this.snake.pop();
    }

    if (this.tickCount % 5 == 0 && (this.size.w * this.size.h) * 0.01 > this.foods.length) {
      this.spawnFood();
    }

    this.tickCount++;
  }

  /**
   * @param {Direction} newdir
   * @returns {boolean}
   */
  trySetDirection(newdir) {
    const h = this.snake[0];
    const b = this.snake[1];

    switch (newdir) {
      case "up": if (h.y - 1 == b.y) return false; break;
      case "down": if (h.y + 1 == b.y) return false; break;
      case "left": if (h.x - 1 == b.x) return false; break;
      case "right": if (h.x + 1 == b.x) return false; break;
    }

    this.dir = newdir;

    return true;
  }

  generateWalls() {
    /** @type {string} */
    const wallType = [
      "free",
      "frame",
      "frameVer",
      "frameHor",
      "random10",
      "random05"
    ].sort(_ => 0.5 - Math.random()).shift();

    if (wallType == "free") return;

    if (wallType.startsWith("frame")) {
      if (wallType == "frame" || wallType == "frameVer") for (let y = 0; y < this.size.h; y++) {
        this.walls[0][y] = true;
        this.walls[this.size.w - 1][y] = true;
      }

      if (wallType == "frame" || wallType == "frameHor") for (let x = 0; x < this.size.w; x++) {
        this.walls[x][0] = true;
        this.walls[x][this.size.h - 1] = true;
      }
    } else if (wallType.startsWith("random")) {
      const chance = Number.parseFloat(`0.${wallType.slice(-2)}`);

      for (let x = 0; x < this.size.w; x++) for (let y = 0; y < this.size.h; y++) {
        if (Math.random() < chance) this.walls[x][y] = true;
      }
    }
  }

  spawnFood() {
    for (let att = 0; att < 5; att++) {
      /** @type {Point} */
      let pos = {
        x: Math.floor(Math.random() * this.size.w),
        y: Math.floor(Math.random() * this.size.h)
      }

      if (this.walls[pos.x][pos.y]) continue;
      if (this.snake.findIndex(v => v.x == pos.x && v.y == pos.y) != -1) continue;

      this.foods.push(pos);
      return;
    }

    // TODO alternative food spawn
  }
}
