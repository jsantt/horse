import { Graphics } from 'pixi.js';

type Level = { x: number; y: number; length: number };

class Ground {
  #groundGraphics!: Graphics;

  #level!: Level;

  #updateCount: number = 0;

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
    this.initLevels(params);

    this.#groundGraphics = new Graphics();

    this.#groundGraphics.beginFill(0xcccccc);
    this.#groundGraphics.drawRect(0, 0, params.appWidth * 4, 3);

    this.drawLevels(params);

    this.x = 0;
    this.y = params.y;

    return this.#groundGraphics;
  }

  private initLevels(params: { appWidth: number; y: number; }) {
    this.#level = { x: params.appWidth + 100, y: -70, length: params.appWidth };
  }

  drawLevels(params: { appWidth: number; y: number }) {
    this.#groundGraphics.drawRect(
      this.#level.x,
      this.#level.y,
      params.appWidth,
      3
    );
  }

  update(settings: { speed: number; appWidth: number }) {
    this.x = this.x - settings.speed;

    if (this.x < -settings.appWidth * 3) {
      this.x = 0;
    }

    this.#updateCount++;
  }
}

export { Ground };
