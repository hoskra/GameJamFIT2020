import * as PIXI from 'pixi.js';
import GameModel from './models/game-model';
import { GameController } from './controllers/game-controller';


class Game extends PIXI.Application {
  lastTime = 0;
  gameTime = 0;

  gameModel: GameModel;
  gameController: GameController;

  constructor() {
    super({
      view: <HTMLCanvasElement>document.getElementById('gameCanvas'),
      backgroundColor: 0x000000,
      width: 1600,
      height: 900
    });

    PIXI.Loader.shared.reset()    // necessary for hot reload
    .add('TEXTURES', './assets/textures.png')
    .add('MAP', './assets/maptest.txt')
    .add('HERO', './assets/hero.png')
    .load(() => this.onAssetsLoaded());

    this.ticker = this.ticker;
    // stop the shared ticket and update it manually
    this.ticker.autoStart = false;
    this.ticker.stop();
  }

  onAssetsLoaded() {
    this.gameModel = new GameModel();
    this.gameModel.init(this.stage);
    this.gameController = new GameController(this.gameModel);
    this.gameController.init();
    this.loop(performance.now());
  }

  // game loop
  private loop(time: number) {
    // update our component library
    let dt = Math.min(time - this.lastTime, 200); // 300ms threshold
    this.lastTime = time;
    this.gameTime += dt;

    this.gameModel.update(dt, this.gameTime);
    this.gameController.update(dt, this.gameTime);

    // update PIXI
    this.ticker.update(this.gameTime);
    requestAnimationFrame((time) => this.loop(time));
  }
}

new Game();