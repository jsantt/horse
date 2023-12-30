import { Graphics } from 'pixi.js';

class Ground {
  #y = 400;
  #graphics?: Graphics;

  load() {
    this.#graphics = new Graphics();
    this.#graphics.beginFill(0xcccccc);
    this.#graphics.drawRect(0, this.#y, 2000, 2);

    return this.#graphics;
  }

  get y() {
    return this.#y;
  }
}

export { Ground };
