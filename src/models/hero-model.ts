import { GameObjectModel } from './game-object-model';
import { BLOCK_SIZE, HERO_POS } from './game-model';
import GameModel from './game-model';
import * as PIXI from 'pixi.js';
import Vec from '../utils/vec';


export enum HeroState {
  WALKING,
  STANDING
}

export class HeroModel extends GameObjectModel {

  state: HeroState;
  // temporary target position for walking
  targetPos: Vec;

  constructor(gameModel: GameModel) {
    super(gameModel);
  }

  init() {
    this.state = HeroState.STANDING;
    let texture = PIXI.Texture.from('HERO');
    texture = texture.clone();
    let sprite = new PIXI.Sprite(texture);
    sprite.texture.frame = new PIXI.Rectangle(0, 0, BLOCK_SIZE, BLOCK_SIZE);
    sprite.position.set(HERO_POS.x * BLOCK_SIZE, HERO_POS.y * BLOCK_SIZE);
    this.gameModel.stage.addChild(sprite);
    this.pixiObj = sprite;
  }

  destroy() {

  }

  walk(targetPos: Vec): boolean {
    if (this.state === HeroState.STANDING && this.gameModel.gameMap.getTile(targetPos).isWalkable) {
      this.targetPos = targetPos;
      this.state = HeroState.WALKING;
      return true;
    } else {
      return false;
    }
  }

  update(delta: number, absolute: number) {
    if (this.state === HeroState.WALKING) {
      const bounds = this.pixiObj.getLocalBounds();
    }
  }
}