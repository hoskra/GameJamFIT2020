import * as PIXI from 'pixi.js';
import Vec from '../utils/vec';
import GameModel from './game-model';

export abstract class GameObjectModel {
  gameModel: GameModel;
  pixiObj: PIXI.Container;
  mapPos: Vec; // cell-based position in the map

  constructor(model: GameModel) {
    this.gameModel = model;
  }

  abstract init();

  abstract destroy();

  abstract update(delta: number, absolute: number);
}