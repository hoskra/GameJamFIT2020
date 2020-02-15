import { GameController } from './../controllers/game-controller';
import { DialogModel } from './dialog-model';
import { DialogController } from '../controllers/dialog-controller';
import GameModel from './game-model';


export class DialogManager {
  dialogModel: DialogModel;
  dialogController: DialogController;
  gameModel: GameModel;

  constructor(model: GameModel, gameController: GameController) {
    this.gameModel = model;
    this.dialogController = new DialogController(gameController);
  }

  displayText(text: string) {
    if(this.dialogModel) {
      this.dialogModel.destroy();
    }

    this.dialogModel = new DialogModel(this.gameModel);
    this.dialogModel.init();
    this.dialogController.dialogModel = this.dialogModel;
    this.dialogModel.showText(text);
  }

  update(delta: number, absolute: number) {
    if(this.dialogModel) {
      this.dialogModel.update(delta, absolute);
      this.dialogController.update(delta, absolute);
    }
  }
}