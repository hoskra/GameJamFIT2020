import { MapModel } from './map-model';
import { HeroModel } from './hero-model';
import * as helpers from '../utils/helpers';
import Vec from '../utils/vec';
import { RawMap } from '../parsers/map-parser';
import * as PIXI from 'pixi.js';
import { DialogModel } from './dialog-model';
import GlitchState from '../animators/glitch-state';
import ItemManager from './items/item-manager';
import { Assets } from '../constants';

export const BLOCK_SIZE = 64;
export const TEXTURE_COLUMNS = 16;
export const HERO_POS = new Vec(1, 5);

export default class GameModel {
  gameMap: MapModel;
  stage: PIXI.Container;
  hero: HeroModel;
  dialog: DialogModel;
  itemManager: ItemManager;

  glitchState: GlitchState = new GlitchState();

  screenWidth: number;
  screenHeight: number;

  constructor() {
    this.itemManager = new ItemManager();
  }

  init(app: PIXI.Application, rawMap: RawMap) {
    this.screenWidth = app.view.width;
    this.screenHeight = app.view.height;
    this.stage = app.stage;
    this.gameMap = new MapModel(rawMap);

    this.initScene();
    this.hero = new HeroModel(this);
    this.hero.init();

    this.dialog = new DialogModel(this);
    this.dialog.init();
  }

  initScene() {
    let map = this.gameMap.rawMap;

    for(let i = 0; i< map.blocks; i++) {
      let pos = helpers.mapCellToVector(i, map.columns);
      let cell = map.cells.get(i);

      let texture = PIXI.Texture.from(Assets.TEXTURES);
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
    this.dialog.update(delta, absolute);
  }

  switchGlitchFilter() {
    this.stage.filters = this.glitchState.switch();
  }
}