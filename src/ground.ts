import { Graphics } from 'pixi.js';

type Coordinates = { x: number; y: number };

class Ground {
  #graphics!: Graphics;
  #groundPoints!: Array<Coordinates>;

  #updateCount: number = 0;

  get y() {
    return this.#graphics.y;
  }

  set y(y: number) {
    this.#graphics.y = y;
  }

  get x() {
    return this.#graphics.x;
  }

  set x(x: number) {
    this.#graphics.x = x;
  }

  load(params: { appWidth: number; y: number }) {
    this.#graphics = new Graphics();
    this.x = 0;
    this.y = params.y;
    console.log('ground', this.y);

    this.#graphics.beginFill(0xcccccc);

    this.#graphics.drawRect(0, 0, params.appWidth, 7);
    console.log(
      'draw rect (x, y, width, height)',
      this.x,
      this.y,
      params.appWidth,
      7
    );

    this.#graphics.position.set(this.x, this.y);

    return this.#graphics;
  }

  update(settings: { speed: number; appWidth: number }) {
    //this.x = this.x - settings.speed;

    if (this.#updateCount % 100 === 0) {
      // this.y = this.y - 10;
    }

    this.#updateCount++;
  }
}

export { Ground };
