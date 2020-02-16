import Vec from '../../utils/vec';
import GameModel from '../game-model';
import { getNPCAsset, BLOCK_SIZE, getItemAsset } from '../../constants';
import * as helpers from '../../utils/helpers';
import * as PIXI from 'pixi.js';

export class Item {
  sprite: PIXI.Sprite;
  type: number;
  mapPos: Vec;
}

export class ItemManager {

  gameModel: GameModel;
  items: Map<number, Item> = new Map();
  ownedItems: Set<number> = new Set();

  constructor(gameModel: GameModel) {
    this.gameModel = gameModel;
  }

  init() {
  }

  addItem(mapPos: Vec, type: number) {
    let asset = getItemAsset(type);
    let texture = PIXI.Texture.from(asset);
    let sprite = new PIXI.Sprite(texture);
    sprite.position.set(mapPos.x * BLOCK_SIZE, mapPos.y * BLOCK_SIZE);

    this.gameModel.root.addChild(sprite);
    let item = new Item();
    item.sprite = sprite;
    item.mapPos = mapPos;
    item.type = type;
    this.items.set(helpers.posToMapCell(mapPos.x, mapPos.y, this.gameModel.gameMap.rawMap.columns), item);
  }

  collectItem(mapPos: Vec) {
    let cell = helpers.posToMapCell(mapPos.x, mapPos.y, this.gameModel.gameMap.rawMap.columns);
    let item = this.items.get(cell);
    this.ownedItems.add(item.type);
    // delete special function
    this.gameModel.gameMap.getTile(mapPos).specialFunction = 0;

    this.gameModel.root.removeChild(item.sprite);
    this.items.delete(cell);
  }
}