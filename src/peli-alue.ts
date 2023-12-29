import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Application } from 'pixi.js';

import logoUrl from './assets/horse-logo.jpg';
import { Horse } from './horse';
import { Barrier } from './barrier';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('peli-alue')
export class PeliAlue extends LitElement {
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

  #horse: Horse;
  #barrier: Barrier;
  hyppy: undefined | 'ylös' | 'alas' = undefined;

  constructor() {
    super();
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
      //document.body.appendChild(app.view as any);
      this.renderRoot.querySelector('main')?.appendChild(app.view as any);

      app.stage.addChild(await this.#horse.load());

      this.#horse.x = app.screen.width / 2;
      this.#horse.y = app.screen.height / 2;
      this.#horse.ground = app.screen.height / 2;

      // Add it to the stage to render
      app.stage.addChild(await this.#barrier.load());
      this.#barrier.x = 50;
      this.#barrier.y = app.screen.height / 2 + 150;

      // Listen for frame updates
      app.ticker.add(() => {
        this.#horse.update();
        this.#barrier.update();
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
    'peli-alue': PeliAlue;
  }
}
