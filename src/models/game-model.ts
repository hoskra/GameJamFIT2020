import { MapModel } from './map-model';
import { HeroModel } from './hero-model';
import * as helpers from '../utils/helpers';
import Vec from '../utils/vec';
import { MapParser } from '../parsers/map-parser';
import * as PIXI from 'pixi.js';

const BLOCK_SIZE = 64;
const TEXTURE_COLUMNS = 16;
const HERO_POS = new Vec(1, 5);

export default class GameModel {
  gameMap: MapModel;
  stage: PIXI.Container;
  hero: HeroModel;

  init(stage: PIXI.Container) {
    this.stage = stage;
    let resources = PIXI.Loader.shared.resources;
    let mapParser = new MapParser();
    let map = mapParser.loadMap(resources['MAP'].data);
    this.gameMap = new MapModel(map);

    this.initScene();
    this.initHero();
  }

  initHero() {
    let texture = PIXI.Texture.from('HERO');
    texture = texture.clone();
    let sprite = new PIXI.Sprite(texture);
    sprite.texture.frame = new PIXI.Rectangle(0, 0, BLOCK_SIZE, BLOCK_SIZE);
    sprite.position.set(HERO_POS.x * BLOCK_SIZE, HERO_POS.y * BLOCK_SIZE);
    this.stage.addChild(sprite);
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

  }
}