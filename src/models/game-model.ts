import { GameController } from './../controllers/game-controller';
import { MapModel } from './map-model';
import { HeroModel } from './hero-model';
import * as helpers from '../utils/helpers';
import Vec from '../utils/vec';
import { MapParser, RawMap } from '../parsers/map-parser';
import * as PIXI from 'pixi.js';
import SceneManager from '../scenes/scenestates/scene-manager';
import { DialogModel } from './dialog-model';
import { SCALE_Y, SCALE_X } from '../constants';
import { DialogManager } from './dialog-manager';

export const BLOCK_SIZE = 64;
export const TEXTURE_COLUMNS = 16;
export const HERO_POS = new Vec(1, 5);

export default class GameModel {
  gameMap: MapModel;
  gameController: GameController;
  stage: PIXI.Container;
  root: PIXI.Container;
  hero: HeroModel;
  screenWidth: number;
  screenHeight: number;
  dialogManager: DialogManager;

  init(app: PIXI.Application, rawMap: RawMap, gameController: GameController) {
    this.screenWidth = app.view.width;
    this.screenHeight = app.view.height;
    this.gameController = gameController;
    this.stage = app.stage;
    this.root = new PIXI.Container;
    this.stage.addChild(this.root);
    this.root.scale.set(SCALE_X, SCALE_Y);

    this.gameMap = new MapModel(rawMap);

    this.initScene();
    this.hero = new HeroModel(this);
    this.hero.init();
    this.dialogManager = new DialogManager(this, this.gameController);
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
      this.root.addChild(sprite);
    }
  }

  update(delta: number, absolute: number) {
    this.hero.update(delta, absolute);
    this.dialogManager.update(delta, absolute);
  }
}