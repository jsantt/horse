import { Assets, Sprite } from 'pixi.js';
import image from './assets/barrier.png';

class Barrier {
  #currentX = 300;
  #currentY = 300;

  #sprite!: Sprite;

  // force 0 means no force
  #forceX = 0;

  async load() {
    const texture = await Assets.load(image);
    this.#sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);

    this.sprite.x = this.#currentX;
    this.sprite.y = this.#currentY;

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
    this.x = this.#currentX + 8;
    if (this.x > 1000) {
      this.x = -300;
    }
  }
}

export { Barrier };
