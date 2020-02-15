import { GameController } from './game-controller';
import { HeroModel, HeroState } from '../models/hero-model';
import { MapModel } from '../models/map-model';
import { Keys } from './key-controller';

export class CameraController {
  private gameController: GameController;
  private heroModel: HeroModel;

  constructor(gameController: GameController) {
    this.gameController = gameController;
    this.heroModel = this.gameController.gameModel.hero;
  }

  update(delta: number, absolute: number) {
    let stage = this.gameController.gameModel.stage;
    let hero = this.gameController.gameModel.hero;
    let heroWidth = hero.pixiObj.width;
    let heroHeight = hero.pixiObj.height;
    let heroPos = this.gameController.gameModel.hero.pixiObj.position;
    let widthOfFrame = this.gameController.gameModel.screenWidth / 2;
    let heightofFrame = this.gameController.gameModel.screenHeight / 2;

    let newX = ((-1)*(heroPos.x + heroWidth / 2) * stage.scale.x) + widthOfFrame;
    let newY = ((-1)*(heroPos.y + heroHeight / 2) * stage.scale.y) + heightofFrame;

    stage.position.set(newX, newY);
  }
}