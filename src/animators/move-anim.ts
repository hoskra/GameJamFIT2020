import { BaseAnimator } from './base-animator';
import { GameObjectModel } from '../models/game-object-model';
import Vec from '../utils/vec';
import * as helpers from '../utils/helpers';
import { Direction } from '../constants';

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

  update(delta: number, absolute: number) {
    if(this.isRunning) {
      const direction = helpers.getDirection(this.sourceCell, this.targetCell);

      let diffX = 0;
      let diffY = 0;

      switch(direction) {
        case Direction.DOWN:
          diffY = 1;
          break;
        case Direction.UP:
          diffY = -1;
          break;
        case Direction.LEFT:
          diffX = -1;
          break;
        case Direction.RIGHT:
          diffX = 1;
      }

      this.object.pixiObj.position.set(this.object.pixiObj.position.x + diffX * this.speed * delta * 0.01, this.object.pixiObj.position.y + diffY * this.speed * delta * 0.01);

      // check alignments
      if(helpers.isAlmostAtCell(new Vec(this.object.pixiObj.position.x, this.object.pixiObj.position.y), this.targetCell)) {
        helpers.alignToCell(this.object, this.targetCell);
        this.isRunning = false;
        this.onComplete();
      }
    }
  }
}