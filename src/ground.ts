import { Graphics } from 'pixi.js';

type Level = { x: number; y: number; length: number };

class Ground {
  #groundGraphics!: Graphics;

  #level!: Level;

  get y() {
    return this.#groundGraphics.y;
  }

  set y(y: number) {
    this.#groundGraphics.y = y;
  }

  get x() {
    return this.#groundGraphics.x;
  }

  set x(x: number) {
    this.#groundGraphics.x = x;
  }

  load(params: { appWidth: number; y: number }) {
    this.#level = this.getInitLevels(params);

    this.#groundGraphics = new Graphics();

    this.#groundGraphics.beginFill(0xcccccc);
    this.#groundGraphics.drawRect(0, 0, params.appWidth * 6, 3);

    this.drawLevels();

    this.x = 0;
    this.y = params.y;

    return this.#groundGraphics;
  }

  private getInitLevels(params: { appWidth: number; y: number }) {
    return {
      x: params.appWidth + 100,
      y: -70,
      length: params.appWidth + Math.random() * 1000,
    };
  }

  drawLevels() {
    this.#groundGraphics.drawRect(
      this.#level.x,
      this.#level.y,
      this.#level.length,
      3
    );
  }

  update(params: { horseSpeed: number; horseX: number; appWidth: number }) {
    let currentGround;

    // move grounds backwards
    this.x = this.x - params.horseSpeed;

    // loop back to start when drawn grounds end
    if (this.x < -params.appWidth * 3) {
      this.x = 0;
    }

    // return grounds, which are under the horse
    console.log('x ja level x', this.x, this.#level.x);

    if (
      -this.x + params.horseX > this.#level.x &&
      -this.x + params.horseX < this.#level.x + this.#level.length
    ) {
      currentGround = { ground: this.y, ground2: this.y - 70 };
    } else {
      currentGround = { ground: this.y };
    }
    return currentGround;
  }
}

export { Ground };
