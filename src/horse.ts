import { Assets, Sprite } from 'pixi.js';
import image from './assets/horse.png';

class Horse {
  #x = 100;
  #y = 300;

  #speed = 1;
  #maxSpeed = 7;
  #accelaration = 0.05;

  #sprite!: Sprite;

  #groundY = 0.5;

  // force 0 means no force
  #forceX = 0;
  #forceY = 0;

  async load(settings: { groundY: number }) {
    this.#groundY = settings?.groundY;

    const texture = await Assets.load(image);
    this.#sprite = new Sprite(texture);

    this.sprite.x = this.#x;
    this.sprite.y = this.#y;

    return this.#sprite;
  }

  set ground(yValue: number) {
    this.#groundY = yValue;
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
    this.#forceY = -55;
  }

  update() {
    this.#handleGravity();
    this.#accelerate();

    return { x: this.#x, y: this.#y, w: 59, h: 38 };
  }

  #handleGravity() {
    this.y = this.#y + this.#forceY * 0.1;

    if (this.#y >= this.#groundY) {
      this.#y = this.#groundY;
      this.#forceY = 0;
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
