import Vec from '../../utils/vec';
import GameModel from '../game-model';
import { getNPCAsset, BLOCK_SIZE } from '../../constants';
import * as helpers from '../../utils/helpers';
import * as PIXI from 'pixi.js';

export class NPC {
  sprite: PIXI.Sprite;
  type: number;
  mapPos: Vec;
}

export class NPCManager {

  gameModel: GameModel;
  npcs: Map<number, NPC> = new Map();

  constructor(gameModel: GameModel) {
    this.gameModel = gameModel;
  }

  init() {
  }

  addNPC(mapPos: Vec, type: number) {
    let asset = getNPCAsset(type);
    let texture = PIXI.Texture.from(asset);
    texture = texture.clone();
    texture.frame = new PIXI.Rectangle(0, 11 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    let sprite = new PIXI.Sprite(texture);
    sprite.texture.frame = new PIXI.Rectangle(0, 0, BLOCK_SIZE, BLOCK_SIZE);
    sprite.position.set(mapPos.x * BLOCK_SIZE, mapPos.y * BLOCK_SIZE);

    this.gameModel.root.addChild(sprite);
    let npc = new NPC();
    npc.sprite = sprite;
    npc.mapPos = mapPos;
    npc.type = type;
    this.npcs.set(helpers.posToMapCell(mapPos.x, mapPos.y, this.gameModel.gameMap.rawMap.columns), npc);
  }
}