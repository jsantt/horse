import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Application, Assets, Sprite } from 'pixi.js';

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

  hyppy: undefined | 'ylös' | 'alas' = undefined;

  aloitaPeli() {
    (async () => {
      // The application will create a renderer using WebGL, if possible,
      // with a fallback to a canvas render. It will also setup the ticker
      // and the root stage PIXI.Container
      const app = new Application();

      // The application will create a canvas element for you that you
      // can then insert into the DOM
      //document.body.appendChild(app.view as any);
      this.renderRoot.querySelector('main')?.appendChild(app.view as any);

      // load the texture we need
      const texture = await Assets.load('src/assets/heppa.jpg');

      // This creates a texture from a 'bunny.png' image
      const heppa = new Sprite(texture);

      // Setup the position of the bunny
      heppa.x = app.renderer.width / 2;
      heppa.y = app.renderer.height / 2;

      // Rotate around the center
      heppa.anchor.x = 0.5;
      heppa.anchor.y = 0.5;

      // Add the bunny to the scene we are building
      app.stage.addChild(heppa);

      // Listen for frame updates
      app.ticker.add(() => {
        if (this.hyppy === 'ylös') {
          heppa.anchor.y += 0.02;
        } else if (this.hyppy === 'alas') {
          heppa.anchor.y -= 0.02;
        }

        if (heppa.anchor.y > 0.8) {
          this.hyppy = 'alas';
        }

        if (heppa.anchor.y < 0.5) {
          this.hyppy = undefined;
        }
      });
    })();
  }
  #hyppää() {
    if (this.hyppy !== undefined) {
      return;
    }
    this.hyppy = 'ylös';
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
            ><img src="./src/assets/horse-logo.jpg" />
          `
        : html` <main></main>`}

      <button type="button" @click=${() => this.#hyppää()}>hyppää</button>
      <footer>Tekijät: Lotte ja Alisa</footer>
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
