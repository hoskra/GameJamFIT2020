import { GameController } from './game-controller';
import { HeroModel } from '../models/hero-model';
import { MapModel } from '../models/map-model';

export class HeroController {
  private gameController: GameController;
  private heroModel: HeroModel;
  private mapModel: MapModel;

  constructor(gameController: GameController) {
    this.gameController = gameController;
    this.heroModel = this.gameController.gameModel.hero;
    this.mapModel = this.gameController.gameModel.gameMap;
  }

  update(delta: number, absolute: number) {
    
  }
}