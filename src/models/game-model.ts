import { MapModel } from './map-model';
import { HeroModel } from './hero-model';
import * as helpers from '../utils/helpers';
import Vec from '../utils/vec';
import { MapParser, RawMap } from '../parsers/map-parser';
import * as PIXI from 'pixi.js';
import SceneManager from '../scenes/scenestates/scene-manager';

export const BLOCK_SIZE = 64;
export const TEXTURE_COLUMNS = 16;
export const HERO_POS = new Vec(1, 5);

export default class GameModel {
  gameMap: MapModel;
  stage: PIXI.Container;
  hero: HeroModel;
  screenWidth: number;
  screenHeight: number;

  init(app: PIXI.Application, rawMap: RawMap) {
    this.screenWidth = app.view.width;
    this.screenHeight = app.view.height;
    this.stage = app.stage;
    this.gameMap = new MapModel(rawMap);

    this.initScene();
    this.hero = new HeroModel(this);
    this.hero.init();
  }

  initScene() {
    let map = this.gameMap.rawMap;

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

  update(delta: number, absolute: number) {
    this.hero.update(delta, absolute);
  }
}