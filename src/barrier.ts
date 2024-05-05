import { Assets, Sprite, Texture } from 'pixi.js';

import oxer from './assets/oxer.png';
import doubleOxer from './assets/double-oxer.png';

class Barrier {
  #sprite!: Sprite;

  #oxer!: Texture;
  #doubleOxer!: Texture;

  async load(settings: { groundY: number; appWidth: number }) {
    this.#oxer = await Assets.load(oxer);
    this.#doubleOxer = await Assets.load(doubleOxer);

    this.#sprite = new Sprite(this.#oxer);
    this.#sprite.anchor.set(0.5);

    this.y = settings.groundY;
    this.x = settings.appWidth;

    this.#sprite.x = this.x;
    this.#sprite.y = this.y;

    return this.#sprite;
  }

  get sprite() {
    return this.#sprite;
  }

  get x() {
    return this.#sprite.x;
  }

  get y() {
    return this.#sprite.y;
  }

  set x(value) {
    this.#sprite.x = value;
  }

  set y(value) {
    this.#sprite.y = value;
  }

  update(params: { appWidth: number; speed: number }) {
    // new random barrier
    if (this.x >= params.appWidth) {
      this.#sprite.texture = this.#getBarrier();
    }

    this.x = this.x - params.speed;
    if (this.x < -this.#sprite.width) {
      this.x = this.#getNextBarrierX(params.appWidth);
    }
    return {
      x: this.x,
      y: this.y,
      w: this.#sprite.width,
      h: this.#sprite.height,
    };
  }

  #getNextBarrierX(appWidth: number) {
    const random = Math.random() * 900;

    return appWidth + random;
  }

  #getBarrier(): Texture {
    const random = Math.random();

    if (random < 0.5) {
      return this.#oxer;
    } else {
      return this.#doubleOxer;
    }
  }
}

export { Barrier };
