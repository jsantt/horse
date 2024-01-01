import { Assets, Sprite } from 'pixi.js';

class Barrier {
  #currentX = 1200;
  #currentY = 300;

  #appWidth!: number;

  #sprite!: Sprite;

  // force 0 means no force
  #forceX = 0;

  async load(settings: { image: string; groundY: number; appWidth: number }) {
    this.#currentY = settings.groundY;
    this.#currentX = settings.appWidth;

    this.#appWidth = settings.appWidth;

    const texture = await Assets.load(settings.image);
    this.#sprite = new Sprite(texture);

    this.#sprite.x = this.#currentX;
    this.#sprite.y = this.#currentY;

    return this.#sprite;
  }

  get sprite() {
    return this.#sprite;
  }

  get x() {
    return this.#currentX;
  }

  get y() {
    this.#forceX;
    return this.#currentY;
  }

  set x(value) {
    this.#currentX = value;
    this.#sprite.x = value;
  }

  set y(value) {
    this.#currentY = value;
    this.#sprite.y = value;
  }

  update() {
    this.x = this.#currentX - 6;
    if (this.x < -this.#sprite.width) {
      this.x = this.#appWidth;
    }
    return {
      x: this.#currentX,
      y: this.#currentY,
      w: this.#sprite.width,
      h: this.#sprite.height,
    };
  }
}

export { Barrier };
