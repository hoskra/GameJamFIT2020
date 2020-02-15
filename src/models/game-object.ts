import * as PIXI from 'pixi.js';
import Vec from '../utils/vec';
import GameModel from './game-model';

export abstract class GameObject {
  gameModel: GameModel;
  pixiObj: PIXI.Container;
  mapPos: Vec; // cell-based position in the map

  constructor(model: GameModel) {
    this.gameModel = model;
  }

  abstract update(delta: number, absolute: number);
}