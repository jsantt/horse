import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Application } from 'pixi.js';

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

  @state()
  private gameState: 'NOT_STARTED' | 'STARTING' | 'RUNNING' = 'NOT_STARTED';

  #ground: Ground;
  #horse: Horse;
  #barrier: Barrier;

  constructor() {
    super();
    this.#ground = new Ground();
    this.#horse = new Horse();
    this.#barrier = new Barrier();
  }

  async #initGame(): Promise<Application> {
    const app: Application = new Application({
      backgroundColor: 0xf6f6f6,
      resizeTo: window,
    });

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    this.renderRoot
      .querySelector('main')
      ?.appendChild(app.view as unknown as Node);

    // Load images and add them into view
    app.stage.addChild(
      this.#ground.load({
        appWidth: app.screen.width,
        y: app.screen.height - 100,
      })
    );

    app.stage.addChild(await this.#horse.load());

    app.stage.addChild(
      await this.#barrier.load({
        groundY: this.#ground.y,
        appWidth: app.screen.width,
      })
    );

    return app;
  }

  #start() {
    this.gameState = 'RUNNING';

    setTimeout(async () => {
      // The application will create a renderer using WebGL, if possible,
      // with a fallback to a canvas render. It will also setup the ticker
      // and the root stage PIXI.Container
      const app = await this.#initGame();
      console.log('width and height', app.screen.width, app.screen.height);

      let checkCollisions = true;

      let frameCount: number = 0;
      // Listen for frame updates
      // Every frame we call every object to update themselves
      app.ticker.add(() => {
        frameCount++;

        // BARRIER
        let barrier;
        barrier = this.#barrier.update({
          appWidth: app.screen.width,
          speed: this.#horse.speed,
        });

        // GROUND
        this.#ground.update({
          speed: this.#horse.speed,
          appWidth: app.screen.width,
        });

        // HORSE
        const horse = this.#horse.update({ groundY: this.#ground.y });

        // CHECK COLLISIONS
        if (frameCount % 100 === 0) {
          console.log('barrier', barrier);
          console.log('horse', horse);
        }
        if (checkCollisions && hasCollided(barrier, horse)) {
          console.log('BANGGGG!!');
          checkCollisions = false;

          this.#horse.speed = 2;
          setTimeout(() => {
            checkCollisions = true;
          }, 300);
        }
      }, 0);
    });
  }

  render() {
    return html`
      ${this.gameState !== 'RUNNING'
        ? html`
            <header>
              <h1>Tervetuloa horse ten peliin</h1>
            </header>
            <button @click=${() => this.#start()}>aloita</button
            ><img src=${logoUrl} />
            <footer>Tekijät: Lotte ja Alisa</footer>
          `
        : html` <main @click=${() => this.#horse.jump()}></main> `}
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
