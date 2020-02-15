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

    let widthOfFrame = this.gameController.gameModel.screenWidth ;
    let heightofFrame = this.gameController.gameModel.screenHeight / 2;

    let newX = (-1)*this.gameController.gameModel.hero.pixiObj.position.x + widthOfFrame/2;
    let newY = (-1)*this.gameController.gameModel.hero.pixiObj.position.y + heightofFrame/2;

    //  let newX = this.gameController.gameModel.hero.pixiObj.position.x;
    //  let newY = this.gameController.gameModel.hero.pixiObj.position.y - heightofFrame;


    let bounds = hero.pixiObj.getLocalBounds();
    stage.position.set(newX, newY);
    // console.log(widthOfFrame);
    // console.log(heightofFrame);
    console.log(this.gameController.gameModel.hero.pixiObj.position.x);
    console.log(this.gameController.gameModel.hero.pixiObj.position.y);
    // console.log(stage.position.x);
    // console.log(stage.position.y);
  }
}