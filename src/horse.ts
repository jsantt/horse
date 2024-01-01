import { Assets, Sprite } from 'pixi.js';
import image from './assets/horse.png';

class Horse {
  #currentX = 100;
  #currentY = 300;

  #sprite!: Sprite;

  #groundY = 0.5;

  // force 0 means no force
  #forceX = 0;
  #forceY = 0;

  async load(settings: { groundY: number }) {
    this.#groundY = settings?.groundY;

    const texture = await Assets.load(image);
    this.#sprite = new Sprite(texture);

    this.sprite.x = this.#currentX;
    this.sprite.y = this.#currentY;

    return this.#sprite;
  }

  set ground(yValue: number) {
    this.#groundY = yValue;
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

  jump() {
    this.#forceY = -55;
  }

  update() {
    // apply force
    this.y = this.#currentY + this.#forceY * 0.1;

    if (this.#currentY >= this.#groundY) {
      this.#currentY = this.#groundY;
      this.#forceY = 0;
    } else {
      this.#forceY = this.#forceY + 2;
    }
    return { x: this.#currentX, y: this.#currentY, w: 59, h: 38 };
  }
}

export { Horse };
