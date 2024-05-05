import { Assets, Sprite } from 'pixi.js';
import image from './assets/horse2.jpg';

class Horse {
  #x = 40;
  #y = 300;

  #speed = 1;
  #maxSpeed = 7;
  #accelaration = 0.02;
  #jumpForce = 40;
  #gravity = 0.3;

  #sprite!: Sprite;

  // force 0 means no force
  #forceX = 0;
  #forceY = 0;

  async load() {
    const texture = await Assets.load(image);
    this.#sprite = new Sprite(texture);
    this.#sprite.anchor.set(0.5);

    this.sprite.x = this.#x;
    this.sprite.y = this.#y;

    return this.#sprite;
  }

  get sprite() {
    return this.#sprite;
  }

  get x() {
    return this.#x;
  }

  get y() {
    this.#forceX;
    return this.#y;
  }

  set x(value) {
    this.#x = value;
    this.#sprite.x = value;
  }

  set y(value) {
    this.#y = value;
    this.#sprite.y = value;
  }

  get speed() {
    return this.#speed;
  }

  set speed(speed: number) {
    this.#speed = speed;
  }

  jump() {
    this.#forceY = -this.#jumpForce;
  }

  update(params: { ground: number; ground2?: number }) {
    this.#handleGravity(params);
    this.#accelerate();

    return { x: this.#x, y: this.#y, w: 59, h: 38 };
  }

  #handleGravity(params: { ground: number; ground2?: number }) {
    this.y = this.#y + this.#forceY * this.#gravity;

    if (this.#y >= params.ground) {
      this.#y = params.ground;
      this.#forceY = 0;
    } else if (params.ground2 && this.#y >= params.ground2) {
      this.#y = params.ground2;
    } else {
      this.#forceY = this.#forceY + 2;
    }
  }

  #accelerate() {
    if (this.#speed <= this.#maxSpeed) {
      this.#speed = this.#speed + this.#accelaration;
    }
  }
}

export { Horse };
