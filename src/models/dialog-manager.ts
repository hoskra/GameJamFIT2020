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
    this.dialogModel = new DialogModel(this.gameModel);
    this.dialogController.dialogModel = this.dialogModel;
    this.dialogModel.init();
    this.dialogModel.hide();
  }

  get isDialogRunning() {
    return !this.dialogModel.isHidden;
  }

  displayText(text: string) {
    this.dialogModel.showText(text);
  }

  update(delta: number, absolute: number) {
    if(!this.dialogModel.isHidden) {
      this.dialogModel.update(delta, absolute);
      this.dialogController.update(delta, absolute);
    }
  }
}