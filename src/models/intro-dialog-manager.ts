import { ChoiceController } from './../controllers/choice-controller';
import { GameController } from './../controllers/game-controller';
import { DialogModel } from './dialog-model';
import { DialogController } from '../controllers/dialog-controller';
import GameModel from './game-model';
import { ChoiceModel } from './choice-model';
import { IntroController } from '../controllers/intro-controller';
import IntroModel from './intro-model';

export class IntroDialogManager {
  dialogModel: DialogModel;
  dialogController: DialogController;
  introModel: IntroModel;

  constructor(model: IntroModel, introController: IntroController) {
    this.introModel = model;
    this.dialogController = new DialogController(introController.keyController);
    this.dialogModel = new DialogModel(model.screenWidth, model.screenHeight, model.stage);
    this.dialogController.dialogModel = this.dialogModel;
    this.dialogModel.init();
    this.dialogModel.hide();
  }

  get isDialogRunning() {
    return !this.dialogModel.isHidden;
  }


  displayText(text: string, onComplete: () => void) {
    this.dialogModel.showText(text);
    this.dialogController.onDialogFinish = onComplete;
  }

  update(delta: number, absolute: number) {
    if(!this.dialogModel.isHidden) {
      this.dialogModel.update(delta, absolute);
      this.dialogController.update(delta, absolute);
    }
  }
}