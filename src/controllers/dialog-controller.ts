import { GameController } from './game-controller';
import { Keys, KeyController } from './key-controller';
import { DialogModel, DialogState } from '../models/dialog-model';

export class DialogController {
  private keyController: KeyController;
  dialogModel: DialogModel;
  onDialogFinish: () => void;

  constructor(keyController: KeyController) {
    this.keyController = keyController;
  }

  update(delta: number, absolute: number) {
    if(this.dialogModel.isHidden) {
      return;
    }

    if(this.dialogModel.state === DialogState.WAITING_FOR_INPUT && this.keyController.isKeyPressed(Keys.KEY_SPACE)) {
      this.dialogModel.showMore();
    }
    if(this.dialogModel.state === DialogState.FINISHED && this.keyController.isKeyPressed(Keys.KEY_SPACE)) {
      this.dialogModel.hide();
      this.keyController.setKeyHandled(Keys.KEY_SPACE);
      if(this.onDialogFinish) {
        let finish = this.onDialogFinish;
        this.onDialogFinish = null;
        finish();
      }
    }
  }
}