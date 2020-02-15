import * as PIXI from 'pixi.js';
import SceneManager from './scenes/scenestates/scene-manager';
import GameModel from './models/game-model';
import { resizeCanvas } from './utils/canvas-resizer';

import { Assets, SCALE_Y, SCALE_X } from './constants';


class Game extends PIXI.Application {
  lastTime = 0;
  gameTime = 0;

  public loader = new PIXI.Loader();
  public sceneManager = new SceneManager();

  constructor() {
    super({
      view: <HTMLCanvasElement>document.getElementById('gameCanvas'),
      backgroundColor: 0x000000,
      width: 1600,
      height: 900
    });
    PIXI.Loader.shared.reset()    // necessary for hot reload
    .add(Assets.TEXTURES, './assets/textures.png')
    .add(Assets.MAP, './assets/maptest.txt')
    .add(Assets.HERO, './assets/hero.png')
    .add(Assets.CARDS, './assets/testKarta.png')
    .add(Assets.DIALOG, './assets/dialog_bubble.png')
    .add(Assets.FONT, './assets/8bit.fnt')
    .load(() => this.startGame());

    this.ticker = this.ticker;
    // stop the shared ticket and update it manually
    this.ticker.autoStart = false;
    this.ticker.stop();
    this.initResizeHandler();
  }

  startGame() {
    this.sceneManager = new SceneManager();
    this.sceneManager.initFirst(this, (nextStageName) => this.clear(nextStageName));

    let startScene = this.sceneManager.state.scene;
    startScene.sceneObjects.forEach(x => this.stage.addChild(x));
    this.loop(performance.now());
  }

  clear(nextStageName: string) {
    this.stage.removeChildren();
    this.stage.removeAllListeners();
    this.stage.scale.set(SCALE_X, SCALE_Y);
    this.switchScene(nextStageName);
  }

  switchScene(sceneName: string) {
    let scene = this.sceneManager.nextScene(sceneName, this, (nextStageName) => this.clear(nextStageName));
    scene.sceneObjects.forEach(x => this.stage.addChild(x));
  }

  // game loop
  private loop(time: number) {
    // update our component library
    let dt = Math.min(time - this.lastTime, 200); // 300ms threshold
    this.lastTime = time;
    this.gameTime += dt;

    this.sceneManager.update(dt, this.gameTime);

    // update PIXI
    this.ticker.update(this.gameTime);
    requestAnimationFrame((time) => this.loop(time));
  }

  private initResizeHandler() {
    let virtualWidth = this.screen.width;
    let virtualHeight = this.screen.height;
    resizeCanvas(this.view, virtualWidth, virtualHeight);
    window.addEventListener('resize',this.resizeHandler);
  }

  private resizeHandler = (evt) => resizeCanvas(this.view, this.screen.width, this.screen.height);
}

new Game();