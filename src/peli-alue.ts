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

  constructor() {
    super();

    (async () => {
      // The application will create a renderer using WebGL, if possible,
      // with a fallback to a canvas render. It will also setup the ticker
      // and the root stage PIXI.Container
      const app = new Application();

      // The application will create a canvas element for you that you
      // can then insert into the DOM
      document.body.appendChild(app.view as any);

      // load the texture we need
      const texture = await Assets.load('src/assets/heppa.jpg');

      // This creates a texture from a 'bunny.png' image
      const bunny = new Sprite(texture);

      // Setup the position of the bunny
      bunny.x = app.renderer.width / 2;
      bunny.y = app.renderer.height / 2;

      // Rotate around the center
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // Add the bunny to the scene we are building
      app.stage.addChild(bunny);

      // Listen for frame updates
      app.ticker.add(() => {
        // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
      });
    })();
  }

  render() {
    return html` pelialue `;
  }

  static styles = css`
    :host {
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'peli-alue': PeliAlue;
  }
}
