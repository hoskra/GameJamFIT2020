import { GameObjectModel } from './game-object-model';
import { BLOCK_SIZE, HERO_POS } from '../constants';
import GameModel from './game-model';
import * as PIXI from 'pixi.js';
import Vec from '../utils/vec';
import { MoveAnim } from '../animators/move-anim';
import { Assets } from '../constants';


export enum HeroState {
  WALKING,
  STANDING
}

export class HeroModel extends GameObjectModel {

  state: HeroState;
  // temporary target position for walking
  targetPos: Vec;
  walkingAnim: MoveAnim;

  constructor(gameModel: GameModel) {
    super(gameModel);
  }

  init() {
    this.state = HeroState.STANDING;
    let texture = PIXI.Texture.from(Assets.HERO);
    texture = texture.clone();
    texture.frame = new PIXI.Rectangle(0, 11 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    let sprite = new PIXI.Sprite(texture);
    sprite.texture.frame = new PIXI.Rectangle(0, 0, BLOCK_SIZE, BLOCK_SIZE);
    sprite.position.set(HERO_POS.x * BLOCK_SIZE, HERO_POS.y * BLOCK_SIZE);
    this.gameModel.root.addChild(sprite);
    this.pixiObj = sprite;
    this.mapPos = HERO_POS.clone();
  }

  destroy() {

  }

  walkLeft(): boolean {
    return this.walk(new Vec(this.mapPos.x -1 , this.mapPos.y));
  }

  walkRight(): boolean {
    return this.walk(new Vec(this.mapPos.x +1, this.mapPos.y));
  }

  walkUp(): boolean {
    return this.walk(new Vec(this.mapPos.x, this.mapPos.y - 1));
  }

  walkDown(): boolean {
    return this.walk(new Vec(this.mapPos.x, this.mapPos.y + 1));
  }

  walk(targetPos: Vec): boolean {
    if (this.state === HeroState.STANDING && this.gameModel.gameMap.getTile(targetPos).isWalkable) {
      this.targetPos = targetPos;
      this.state = HeroState.WALKING;

      this.walkingAnim = new MoveAnim(this, 20, this.mapPos, this.targetPos, () => {
        this.state = HeroState.STANDING;
        this.mapPos = this.targetPos.clone();
        this.walkingAnim = null;
      });

      return true;
    } else {
      return false;
    }
  }

  update(delta: number, absolute: number) {
    if(this.state === HeroState.WALKING) {
      this.walkingAnim.update(delta, absolute);
    }
  }
}