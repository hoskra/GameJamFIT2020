import * as PIXI from 'pixi.js';
import { MapParser } from './parsers/map-parser';
import * as helpers from './utils/helpers';
import CardScene from './scenes/card-scene';
import PATHS from './configs/paths';

const BLOCK_SIZE = 64;
const TEXTURE_COLUMNS = 16;

class Game extends PIXI.Application {

  private obj: PIXI.Graphics;
  public loader = new PIXI.Loader();

  constructor() {
    super({
      view: <HTMLCanvasElement>document.getElementById('gameCanvas'),
      backgroundColor: 0x000000,
      width: 1600,
      height: 900
    });
    let idk = PIXI.Loader.shared;
    idk.reset();
    for(let key of Object.keys(PATHS)) {
      let path = PATHS[key];
      idk.add(path);
    }
    idk.load(() => this.startGame());
  }

  startGame() {
    this.obj = new PIXI.Graphics();
    this.obj.beginFill(0xFF0000);
    this.obj.interactive = true;

    this.obj.endFill();
    let startScene = new CardScene(this, this.clear);
    startScene.sceneObjects.forEach(x => this.stage.addChild(x));
    // initialize game loop
    this.ticker.add(deltaTime => this.update(deltaTime));
  }

  onAssetsLoaded() {
    let resources = PIXI.Loader.shared.resources;
    let mapParser = new MapParser();
    let map = mapParser.loadMap(resources['MAP'].data);

    for(let i = 0; i< map.blocks; i++) {
      let pos = helpers.mapCellToVector(i, map.columns);
      let cell = map.cells.get(i);

      let texture = PIXI.Texture.from('TEXTURES');
      texture = texture.clone();
      let sprite = new PIXI.Sprite(texture);
      let texturePos = helpers.mapCellToVector(cell.defaultTexture, TEXTURE_COLUMNS);
      sprite.texture.frame = new PIXI.Rectangle(texturePos.x * BLOCK_SIZE, texturePos.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      sprite.position.set(pos.x * BLOCK_SIZE, pos.y * BLOCK_SIZE);
      this.stage.addChild(sprite);
    }
  }

  // game loop
  update(deltaTime: number) {
    //this.obj.rotation += 0.01 * deltaTime;
  }

  private clear(nextStageName: string) {
    this.stage.removeChildren();
    this.stage.removeAllListeners();
  }
}

new Game();