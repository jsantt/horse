import { Graphics } from 'pixi.js';

class DebugGrid {
  #groundGraphics!: Graphics;

  load() {
    this.#groundGraphics = new Graphics();

    this.#groundGraphics.beginFill(0xcccccc);

    for (let y = 0; y <= 1000; y += 100) {
      this.#groundGraphics.drawRect(0, y, 5, 5);
    }

    for (let x = 0; x <= 1000; x += 100) {
      this.#groundGraphics.drawRect(x, 0, 5, 5);
    }

    return this.#groundGraphics;
  }
}

export { DebugGrid };
