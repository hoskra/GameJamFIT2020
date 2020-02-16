import { BaseAnimator } from './base-animator';
import { GameObjectModel } from '../models/game-object-model';
import Vec from '../utils/vec';
import * as helpers from '../utils/helpers';
import { Direction, BLOCK_SIZE } from '../constants';
import * as PIXI from 'pixi.js';

export class MoveAnim extends BaseAnimator {

  object: GameObjectModel;
  sourceCell: Vec;
  targetCell: Vec;
  speed: number;
  onComplete: () => void;

  constructor(object: GameObjectModel, speed: number, sourceCell: Vec, targetCell: Vec, onComplete: () => void) {
    super();
    this.object = object;
    this.speed = speed;
    this.sourceCell = sourceCell;
    this.targetCell = targetCell;
    this.onComplete = onComplete;
  }

  textureSwitchCounter = 0;
  currentFrame = 0;

  lastDistance = 0;
  update(delta: number, absolute: number) {
    if(this.isRunning) {
      const direction = helpers.getDirection(this.sourceCell, this.targetCell);

      let diffX = 0;
      let diffY = 0;
      let textureOffset = 8;

      switch(direction) {
        case Direction.DOWN:
          diffY = 1;
          textureOffset = 10;
          break;
        case Direction.UP:
          diffY = -1;
          textureOffset = 8;
          break;
        case Direction.LEFT:
          diffX = -1;
          textureOffset = 9;
          break;
        case Direction.RIGHT:
          diffX = 1;
          textureOffset = 11;
          break;
      }



      if(this.textureSwitchCounter++ % 3 == 0) {
        this.currentFrame = (this.currentFrame + 1) % 9;
        (this.object.pixiObj as PIXI.Sprite).texture.frame = new PIXI.Rectangle(this.currentFrame * BLOCK_SIZE, textureOffset * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }

      this.object.pixiObj.position.set(this.object.pixiObj.position.x + diffX * this.speed * delta * 0.01, this.object.pixiObj.position.y + diffY * this.speed * delta * 0.01);
      
      if(this.lastDistance == 0) {
        this.lastDistance = new Vec(this.object.pixiObj.position.x, this.object.pixiObj.position.y).distance(this.targetCell.multiply(BLOCK_SIZE));
      }

      // check alignments
      if(helpers.isAlmostAtCell(new Vec(this.object.pixiObj.position.x, this.object.pixiObj.position.y), this.targetCell)) {
        helpers.alignToCell(this.object, this.targetCell);
        this.isRunning = false;
        this.onComplete();
      } else {
        let distance = new Vec(this.object.pixiObj.position.x, this.object.pixiObj.position.y).distance(this.targetCell.multiply(BLOCK_SIZE));
        if(this.lastDistance < distance) {
          helpers.alignToCell(this.object, this.targetCell);
          this.isRunning = false;
          this.onComplete();
        }
        this.lastDistance = distance;
      }
    }
  }
}