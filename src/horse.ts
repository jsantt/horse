import { Assets, Sprite } from 'pixi.js';
import image from './assets/keppari.jpg';

class Horse {
  #currentX = 300;
  #currentY = 300;

  #sprite!: Sprite;

  #ground = 0.5;

  // force 0 means no force
  #forceX = 0;
  #forceY = 0;

  async load() {
    const texture = await Assets.load(image);
    this.#sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);

    this.sprite.x = this.#currentX;
    this.sprite.y = this.#currentY;

    return this.#sprite;
  }

  set ground(yValue: number) {
    this.#ground = yValue;
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
    this.#forceY = -50;
  }

  update() {
    // apply force
    this.y = this.#currentY + this.#forceY * 0.1;

    if (this.#currentY >= this.#ground) {
      this.#currentY = this.#ground;
      this.#forceY = 0;
    } else {
      this.#forceY = this.#forceY + 1;
    }
  }
}

export { Horse };
