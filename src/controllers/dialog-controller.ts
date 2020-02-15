import { GameController } from './game-controller';
import { Keys } from './key-controller';
import { DialogModel, DialogState } from '../models/dialog-model';

export class DialogController {
  private gameController: GameController;
  dialogModel: DialogModel;

  constructor(gameController: GameController) {
    this.gameController = gameController;
  }

  update(delta: number, absolute: number) {
    if(this.dialogModel.isHidden) {
      return;
    }

    if(this.dialogModel.state === DialogState.WAITING_FOR_INPUT && this.gameController.isKeyPressed(Keys.KEY_SPACE)) {
      this.dialogModel.showMore();
    }
    if(this.dialogModel.state === DialogState.FINISHED && this.gameController.isKeyPressed(Keys.KEY_SPACE)) {
      this.dialogModel.hide();
    }
  }
}