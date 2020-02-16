import * as PIXI from 'pixi.js';
import SceneManager from './scenes/scenestates/scene-manager';
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
      height: 900,
     // resolution: SCALE_X TODO
    });
    PIXI.Loader.shared.reset()    // necessary for hot reload
    .add(Assets.TEXTURES, './assets/map2.png')
    .add(Assets.MAP, './assets/maptest2.txt')
    .add(Assets.HERO, './assets/hero/rogue.png')
    .add(Assets.BEER, './assets/pivo/beer.png')
    .add(Assets.EGO_MEC,'./assets/cards/ego-mec.png')
    .add(Assets.EGO_MOC,'./assets/cards/ego-moc.png')
    .add(Assets.EGO_SVET,'./assets/cards/ego-svet.png')
    .add(Assets.EGO,'./assets/cards/ego.png')
    .add(Assets.MAG_CARY,'./assets/cards/mag-cary.png')
    .add(Assets.MAG_OHEN,'./assets/cards/mag-ohen.png')
    .add(Assets.MAG_SIKANA,'./assets/cards/mag-sikana.png')
    .add(Assets.MAG,'./assets/cards/mag.png')
    .add(Assets.NINJA_LUK,'./assets/cards/ninja-luk.png')
    .add(Assets.NINJA_MOZEK,'./assets/cards/ninja-mozek.png')
    .add(Assets.NINJA_SVOBODA,'./assets/cards/ninja-svoboda.png')
    .add(Assets.NINJA,'./assets/cards/ninja.png')
    .add(Assets.DIALOG_HERO, './assets/dialog_bubble.png')
    .add(Assets.DIALOG_NPC, './assets/dialog_bubble_npc.png')
    .add(Assets.INTRO, './assets/intro.jpg')
    .add(Assets.DIALOG_NEXT, './assets/dialog_next.png')
    .add(Assets.DIALOGS, './assets/dialog_sample.json')

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