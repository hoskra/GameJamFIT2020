import * as PIXI from 'pixi.js';
import { MapParser } from './parsers/map-parser';
import * as helpers from './utils/helpers';
import CardScene from './scenes/card-scene';
import PATHS from './configs/paths';
import FirstScene from './scenes/first-scene';
import SceneManager from './scenes/scenestates/scene-manager';

const BLOCK_SIZE = 64;
const TEXTURE_COLUMNS = 16;

class Game extends PIXI.Application {

  private obj: PIXI.Graphics;
  public loader = new PIXI.Loader();
  public sceneManager = new SceneManager();

  constructor() {
    super({
      view: <HTMLCanvasElement>document.getElementById('gameCanvas'),
      backgroundColor: 0x000000,
      width: 1600,
      height: 900
    });
    let idk = PIXI.Loader.shared;
    idk.reset();
    for (let key of Object.keys(PATHS)) {
      let path = PATHS[key];
      idk.add(path);
    }
    idk
      .add('TEXTURES', './assets/textures.png')
      .add('MAP', './assets/maptest.txt');
    idk.load(() => this.startGame());
  }

  startGame() {

    this.sceneManager = new SceneManager();
    this.sceneManager.intiFirst(this, (nextStageName) => this.clear(nextStageName));

    this.obj = new PIXI.Graphics();
    this.obj.beginFill(0xFF0000);
    this.obj.interactive = true;

    this.obj.endFill();
    let startScene = this.sceneManager.state.scene;
    startScene.sceneObjects.forEach(x => this.stage.addChild(x));
    // initialize game loop
    this.ticker.add(deltaTime => this.update(deltaTime));
  }

  // game loop
  update(deltaTime: number) {
    //this.obj.rotation += 0.01 * deltaTime;
  }

  private clear(nextStageName: string) {
    this.stage.removeChildren();
    this.stage.removeAllListeners();
    this.MapSwap(nextStageName);
  }

  private MapSwap(sceneName: string) {
    let scene = this.sceneManager.nextScene(sceneName, this, (nextStageName) => this.clear(nextStageName));
    scene.sceneObjects.forEach(x => this.stage.addChild(x));
  }
}

new Game();