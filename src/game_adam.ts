import * as PIXI from 'pixi.js';
import { MapParser } from './parsers/map-parser';
import * as helpers from './utils/helpers';

const BLOCK_SIZE = 32;
const TEXTURE_COLUMNS = 32;

class Game extends PIXI.Application {

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
    .load(() => this.onAssetsLoaded());

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
  }
}

new Game();