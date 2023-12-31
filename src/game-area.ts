import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Application, Graphics } from 'pixi.js';

import logoUrl from './assets/horse-logo.jpg';
import { Horse } from './horse';
import { Barrier } from './barrier';
import { Ground } from './ground';
import { hasCollided } from './collision-detection';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('game-area')
export class GameArea extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more';

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  @property({ type: Boolean })
  näytäPelialue = false;

  #ground: Ground;
  #horse: Horse;
  #barrier: Barrier;
  hyppy: undefined | 'ylös' | 'alas' = undefined;

  constructor() {
    super();
    this.#ground = new Ground();
    this.#horse = new Horse();
    this.#barrier = new Barrier();
  }

  aloitaPeli() {
    (async () => {
      // The application will create a renderer using WebGL, if possible,
      // with a fallback to a canvas render. It will also setup the ticker
      // and the root stage PIXI.Container
      const app = new Application({
        backgroundColor: 0xf6f6f6,
        resizeTo: window,
      });

      // The application will create a canvas element for you that you
      // can then insert into the DOM
      this.renderRoot.querySelector('main')?.appendChild(app.view as any);

      app.stage.addChild(this.#ground.load());
      app.stage.addChild(await this.#horse.load({ groundY: this.#ground.y }));
      app.stage.addChild(await this.#barrier.load({ groundY: this.#ground.y }));

      // Listen for frame updates
      app.ticker.add(() => {
        const barrier = this.#barrier.update();
        const horse = this.#horse.update();

        const collided = hasCollided(barrier, horse);
        if (collided) {
          // Create a Graphics object, set a fill color, draw a rectangle
          let obj = new Graphics();
          obj.beginFill(0xff0000);
          obj.drawRect(horse.x, horse.y + 60, 10, 10);

          // Add it to the stage to render
          app.stage.addChild(obj);
          setTimeout(() => {
            // Create a Graphics object, set a fill color, draw a rectangle
            let obj = new Graphics();
            obj.beginFill(0xf6f6f6);
            obj.drawRect(horse.x, horse.y + 60, 10, 10);

            // Add it to the stage to render
            app.stage.addChild(obj);
          }, 2000);
        }
      });
    })();
  }
  #hyppää() {
    this.#horse.jump();
  }

  #aloita() {
    this.näytäPelialue = true;
    setTimeout(() => {
      this.aloitaPeli();
    }, 100);
  }

  render() {
    return html`
      ${!this.näytäPelialue
        ? html`
            <header>
              <h1>Tervetuloa horse ten peliin</h1>
            </header>
            <button @click=${() => this.#aloita()}>aloita</button
            ><img src=${logoUrl} />
            <footer>Tekijät: Lotte ja Alisa</footer>
          `
        : html` <main @click=${() => this.#hyppää()}></main> `}
    `;
  }

  static styles = css`
    img {
      max-width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'peli-alue': GameArea;
  }
}
