import { GameController } from './../controllers/game-controller';
import { MapModel } from './map-model';
import { HeroModel } from './hero-model';
import * as helpers from '../utils/helpers';
import Vec from '../utils/vec';
import { RawMap, RawMapTile } from '../parsers/map-parser';
import * as PIXI from 'pixi.js';
import { DialogModel } from './dialog-model';
import { SCALE_Y, SCALE_X } from '../constants';
import { DialogManager } from './dialog-manager';
import GlitchState from '../animators/glitch-state';
import ItemManager from './items/item-manager';
import { Assets, TEXTURE_COLUMNS, BLOCK_SIZE } from '../constants';

export default class GameModel {
  gameMap: MapModel;
  gameController: GameController;
  stage: PIXI.Container;
  root: PIXI.Container;
  hero: HeroModel;
  screenWidth: number;
  screenHeight: number;
  dialogManager: DialogManager;
  itemManager: ItemManager;
  glitchState: GlitchState;

  items: Map<Vec, PIXI.Sprite> = new Map();


  constructor() {
    this.glitchState = new GlitchState();
    this.itemManager = new ItemManager();
  }

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

  get isPaused() {
    return this.dialogManager.isDialogRunning || this.dialogManager.isChoiceRunning;
  }

  initScene() {
    let map = this.gameMap.rawMap;

    for(let i = 0; i< map.blocks; i++) {
      let pos = helpers.mapCellToVector(i, map.columns);
      let cell = map.cells.get(i);
      if (cell.specialFunction >= 80)
      {
        let cellFake = cell.copy();
        cellFake.defaultTexture = 0;
        cellFake.specialFunction = 0;
        this.drawTile(cellFake, pos);
      }
      let sprite = this.drawTile(cell, pos);

      if (cell.specialFunction >= 80) {
        this.items.set(pos, sprite);
      }
    }
  }

  drawTile(cell: RawMapTile, pos: Vec): PIXI.Sprite {
    let texture = PIXI.Texture.from(Assets.TEXTURES);
    texture = texture.clone();
    let sprite = new PIXI.Sprite(texture);
    let texturePos = helpers.mapCellToVector(cell.defaultTexture, TEXTURE_COLUMNS);
    if(texturePos.y === 29) {
      console.log(texturePos, cell.defaultTexture, TEXTURE_COLUMNS);
    }
    sprite.texture.frame = new PIXI.Rectangle(texturePos.x * BLOCK_SIZE, texturePos.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    sprite.position.set(pos.x * BLOCK_SIZE, pos.y * BLOCK_SIZE);
    this.root.addChild(sprite);
    return sprite;
  }

  update(delta: number, absolute: number) {
    this.hero.update(delta, absolute);
    this.dialogManager.update(delta, absolute);
  }

  switchGlitchFilter() {
    this.stage.filters = this.glitchState.switch();
  }

  removeItem(mapPos: Vec) {
    let key = [...this.items.keys()].filter(item => item.x === mapPos.x && item.y === mapPos.y)[0];
    console.log(key);
    this.root.removeChild(this.items.get(key));
    this.items.delete(key);
  }
}