import { GameController } from './../controllers/game-controller';
import { MapModel } from './map-model';
import { HeroModel } from './hero-model';
import * as helpers from '../utils/helpers';
import Vec from '../utils/vec';
import { RawMap, RawMapTile } from '../parsers/map-parser';
import * as PIXI from 'pixi.js';
import { DialogModel } from './dialog-model';
import { SCALE_Y, SCALE_X, getItemAsset, Items, getNPCAsset, NPC_CARDMASTER, NPC_ECOLOGIST, NPC_HOMELESS, NPC_THIEF, NPC_TERREX, NPC_JUNKIE, NPC_SYSADMIN } from '../constants';
import { DialogManager } from './dialog-manager';
import GlitchState from '../animators/glitch-state';
import { ItemManager } from './items/item-manager';
import { Assets, BLOCK_SIZE } from '../constants';
import { SidebarModel } from './sidebar-model';
import NightState from '../animators/night-state';
import { NPCManager } from './npc/npc-manager';
import { vectorToMapCell } from '../utils/helpers';
import DialogueHelper from '../dialogue-helper';
import { FirstSceneName } from '../scenes/scenestates/scene-names';

export enum MapType {
  CARDMASTER,
  MAIN_MAP,
  DREAM_MAP
}

export enum HeroType {
  MAGE = 2,
  WARRIOR = 0,
  ROGUE = 1
}
export default class GameModel {
  gameMap: MapModel;
  gameController: GameController;
  stage: PIXI.Container;
  root: PIXI.Container;
  hero: HeroModel;
  heroType: HeroType;
  screenWidth: number;
  screenHeight: number;
  dialogManager: DialogManager;
  itemManager: ItemManager;
  glitchState: GlitchState;
  nightFilter: NightState;
  keys: number;
  sideBarModel: SidebarModel;
  NPCManager: NPCManager;
  dialogueHelper: DialogueHelper;
  mapType: MapType;
  heroPos: Vec;

  isDay: boolean = null;
  dayTime: number = 0;

  oracleSatisfied: boolean = false;
  junkieSatisfied: boolean = false;
  ekoSatisfied: boolean = false;
  sysAdminSatisfied: boolean = false;
  dynoSatisfied: boolean = false;
  badKidsSatisfied: boolean = false;
  afterTransitionCallback: (nextScene: string) => void;

  constructor() {
    this.glitchState = new GlitchState();
    this.nightFilter = new NightState();
    this.itemManager = new ItemManager(this);
    this.NPCManager = new NPCManager(this);
    this.dialogueHelper = new DialogueHelper();
  }

  init(mapType: MapType, heroPos: Vec, app: PIXI.Application, rawMap: RawMap, gameController: GameController, initScene: boolean = true, afterTransitionCallback: (nextScene: string) => void) {
    this.afterTransitionCallback = afterTransitionCallback;
    this.mapType = mapType;
    this.heroPos = heroPos;
    this.screenWidth = app.view.width;
    this.screenHeight = app.view.height;
    this.gameController = gameController;
    this.stage = app.stage;
    this.root = new PIXI.Container;
    this.stage.addChild(this.root);
    this.keys = 0;
    this.root.scale.set(SCALE_X, SCALE_Y);

    this.gameMap = new MapModel(rawMap);

    this.initScene(initScene);
    this.hero = new HeroModel(this);
    this.hero.init();
    if(!initScene) {
      this.root.removeChild(this.hero.pixiObj);
    }
    this.dialogManager = new DialogManager(this.screenWidth, this.screenHeight, this.stage, this.gameController.keyController);

    if(mapType !== MapType.CARDMASTER) {
      this.sideBarModel = new SidebarModel(this);
      this.sideBarModel.init();
    }
  }

  get isPaused() {
    return this.dialogManager.isDialogRunning || this.dialogManager.isChoiceRunning;
  }

  interractWithNpc(pos: Vec) {
    let heroPos = this.hero.mapPos;
    let npc = this.NPCManager.npcs.get(vectorToMapCell(pos, this.gameMap.rawMap.columns));
    if(!npc) {
      return;
    }

    if(pos.x === heroPos.x && pos.y === heroPos.y - 1) { // to top
      npc.sprite.texture.frame = new PIXI.Rectangle(0, BLOCK_SIZE * 10, BLOCK_SIZE, BLOCK_SIZE);
    }
    if(pos.x === heroPos.x && pos.y === heroPos.y + 1) { // to bottom
      npc.sprite.texture.frame = new PIXI.Rectangle(0, BLOCK_SIZE * 8, BLOCK_SIZE, BLOCK_SIZE);
    }
    if(pos.y === heroPos.y && pos.x === heroPos.x + 1) { // to right
      npc.sprite.texture.frame = new PIXI.Rectangle(0, BLOCK_SIZE * 9, BLOCK_SIZE, BLOCK_SIZE);
    }
    if(pos.y === heroPos.y && pos.x === heroPos.x - 1) { // to left
      npc.sprite.texture.frame = new PIXI.Rectangle(0, BLOCK_SIZE * 11, BLOCK_SIZE, BLOCK_SIZE);
    }

    if(npc.type === 54) {
      return;
    }

    let text = this.dialogueHelper.getDialogueSequence(npc.type, this.gameController.gameModel);
    this.dialogManager.displayComplexDialog(text,() => {

      switch(npc.type) {
        case NPC_CARDMASTER:
          this.oracleSatisfied = true;
          this.afterTransitionCallback(FirstSceneName);
          break;
        case NPC_HOMELESS:
          break;
        case NPC_THIEF:
            this.badKidsSatisfied = true;
          break;
        case NPC_TERREX:
          break;
        case NPC_JUNKIE:
            this.junkieSatisfied = true;
        break;
        case NPC_ECOLOGIST:
          this.ekoSatisfied = true;
          break;
        case NPC_SYSADMIN:
          this.sysAdminSatisfied = true;
          break;
      }
    } );
  }

  initScene(render: boolean) {
    let map = this.gameMap.rawMap;

    for (let i = 0; i < map.blocks; i++) {
      let pos = helpers.mapCellToVector(i, map.columns);
      let cell = map.cells.get(i);

      let sprite = this.drawTile(cell, pos, render);

      if (cell.specialFunction >= 50 && cell.specialFunction < 80) {
        // NPC
        this.NPCManager.addNPC(pos, cell.specialFunction);
      }

      if (cell.specialFunction >= 80) {
        this.itemManager.addItem(pos, cell.specialFunction);
      }
    }
  }

  drawTile(cell: RawMapTile, pos: Vec, render: boolean): PIXI.Sprite {
    let mapTexture: string;
    let textureColumns: number;
    switch(this.mapType) {
      case MapType.MAIN_MAP:
        textureColumns = 40;
        mapTexture = Assets.TEXTURES;
      break;
      case MapType.CARDMASTER:
          textureColumns = 11;
        mapTexture = Assets.MAP_CARDMASTER_TEXTURE;
      break;
    }
    let texture = PIXI.Texture.from(mapTexture);
    texture = texture.clone();
    let sprite = new PIXI.Sprite(texture);
    let texturePos = helpers.mapCellToVector(cell.defaultTexture, textureColumns);
    sprite.texture.frame = new PIXI.Rectangle(texturePos.x * BLOCK_SIZE, texturePos.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    sprite.position.set(pos.x * BLOCK_SIZE, pos.y * BLOCK_SIZE);
    if (render) {
      this.root.addChild(sprite);
    }
    return sprite;
  }

  update(delta: number, absolute: number) {

    if(this.mapType !== MapType.CARDMASTER) {
      if(this.isDay === null) {
        this.isDay = true;
        this.dayTime = absolute + 10 * 1000;
      } else {
        if(this.dayTime <= absolute) {
          this.dayTime = absolute + 10 * 1000;
          this.isDay = !this.isDay;

          if(this.isDay) {
            this.stage.filters = this.nightFilter.disable();
          } else {
            this.stage.filters = this.nightFilter.enable();
          }
        }
      }
      this.sideBarModel.update(delta, absolute);
    }

    this.hero.update(delta, absolute);
    this.dialogManager.update(delta, absolute);

  }

  switchGlitchFilter() {
    this.stage.filters = this.glitchState.switch();
  }
}