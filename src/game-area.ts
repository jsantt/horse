import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Application } from 'pixi.js';

import logoUrl from './assets/horse-logo.jpg';
import { Horse } from './horse';
import { Barrier } from './barrier';
import { Ground } from './ground';
import { hasCollided } from './collision-detection';
import oxer from './assets/oxer.png';
import doubleOxer from './assets/double-oxer.png';

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
  #oxer: Barrier;
  #doubleOxer: Barrier;

  hyppy: undefined | 'ylös' | 'alas' = undefined;

  constructor() {
    super();
    this.#ground = new Ground();
    this.#horse = new Horse();
    this.#oxer = new Barrier();
    this.#doubleOxer = new Barrier();
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
      app.stage.addChild(
        await this.#horse.load({ groundY: this.#ground.y - 10 })
      );

      const oxerYPosition = this.#ground.y - 30;

      app.stage.addChild(
        await this.#oxer.load({
          image: oxer,
          groundY: oxerYPosition,
          appWidth: app.screen.width,
        })
      );
      app.stage.addChild(
        await this.#doubleOxer.load({
          image: doubleOxer,
          groundY: oxerYPosition,
          appWidth: app.screen.width,
        })
      );

      let nextBarrier: number = 0;

      let checkCollisions = true;
      // Listen for frame updates
      app.ticker.add(() => {
        let barrier;
        if (nextBarrier % 2 === 0) {
          barrier = this.#oxer.update({ speed: this.#horse.speed });
        } else {
          barrier = this.#doubleOxer.update({ speed: this.#horse.speed });
        }

        if (barrier.x + barrier.w <= 1) {
          nextBarrier = nextBarrier + 1;
          console.log(nextBarrier);
        }

        const horse = this.#horse.update();

        if (checkCollisions && hasCollided(barrier, horse)) {
          checkCollisions = false;

          this.#horse.speed = 2;
          setTimeout(() => {
            checkCollisions = true;
          }, 300);
        }
      });
    })();
  }
  #jump() {
    this.#horse.jump();
  }

  #start() {
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
            <button @click=${() => this.#start()}>aloita</button
            ><img src=${logoUrl} />
            <footer>Tekijät: Lotte ja Alisa</footer>
          `
        : html` <main @click=${() => this.#jump()}></main> `}
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
