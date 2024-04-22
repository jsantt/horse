import { Graphics } from 'pixi.js';

type Coordinates = { x: number; y: number };

class Box {
  #graphics!: Graphics;
  #width!: number;

  #groundPoints!: Array<Coordinates>;
  #current = 0;

  get width() {
    return this.#width;
  }

  set width(width) {
    this.#width = width;
  }

  get x() {
    return this.#graphics.x;
  }

  set x(x) {
    this.#graphics.x = x;
  }

  get y() {
    return this.#graphics.y;
  }

  set y(y) {
    this.#graphics.y = y;
  }

  load(settings: { appWidth: number }) {
    this.#groundPoints = [
      {
        x: 0,
        y: 150,
      },
      {
        x: settings.appWidth / 3,
        y: 200,
      },
      {
        x: settings.appWidth / 2,
        y: 120,
      },
      {
        x: settings.appWidth,
        y: 190,
      },
      {
        x: settings.appWidth * 1.3,
        y: 130,
      },
      {
        x: settings.appWidth * 1.6,
        y: 200,
      },
      {
        x: settings.appWidth * 2,
        y: 150,
      },
    ];

    console.log(settings.appWidth);

    this.#graphics = new Graphics();

    const start = this.#groundPoints.at(0)!;

    this.#graphics.lineStyle(2, 0xcccccc).moveTo(start.x, start.y);
    this.#current++;

    for (let point of this.#groundPoints) {
      this.#graphics.lineTo(point.x, point.y);
      this.#current++;
    }

    return this.#graphics;
  }

  update(settings: { speed: number; appWidth: number }) {
    this.x = this.x - settings.speed;

    if (this.x <= -1 * (this.#groundPoints.at(-1)!.x - settings.appWidth)) {
      this.x = 0;
    }
  }
}

export { Box };
