import { ChoiceController } from './../controllers/choice-controller';
import { GameController } from './../controllers/game-controller';
import { DialogModel } from './dialog-model';
import { DialogController } from '../controllers/dialog-controller';
import GameModel from './game-model';
import { ChoiceModel } from './choice-model';
import { ComplexDialog } from './complex-dialog';


export class DialogManager {
  dialogModel: DialogModel;
  dialogController: DialogController;
  choiceModel: ChoiceModel;
  choiceController: ChoiceController;

  gameModel: GameModel;

  constructor(model: GameModel, gameController: GameController) {
    this.gameModel = model;
    this.dialogController = new DialogController(gameController.keyController);
    this.dialogModel = new DialogModel(this.gameModel.screenWidth, this.gameModel.screenHeight, this.gameModel.stage);
    this.dialogController.dialogModel = this.dialogModel;
    this.dialogModel.init();
    this.dialogModel.hide();

    this.choiceController = new ChoiceController(gameController);
    this.choiceModel = new ChoiceModel(this.gameModel);
    this.choiceController.choiceModel = this.choiceModel;
    this.choiceModel.init();
    this.choiceModel.hide();
  }

  get isDialogRunning() {
    return !this.dialogModel.isHidden;
  }

  get isChoiceRunning() {
    return !this.choiceModel.isHidden;
  }

  displayComplexDialog(dialog: ComplexDialog, onComplete: () => void) {
      this.displayText(dialog.getNextNPC(), () => {
        this.displayText(dialog.getNextHero(), () => {
          if(dialog.hasNext()) {
            this.displayComplexDialog(dialog, onComplete);
          } else {
            onComplete();
          }
        }, false);
      }, true);
  }

  displayText(text: string, onComplete: () => void, isNPC: boolean) {
    this.dialogModel.showText(text, isNPC);
    this.dialogController.onDialogFinish = onComplete;
  }

  displayChoice(onComplete: (answer: boolean) => void) {
    this.choiceModel.showChoice();
    this.choiceController.onChoiceFinish = onComplete;
  }

  update(delta: number, absolute: number) {
    if(!this.dialogModel.isHidden) {
      this.dialogModel.update(delta, absolute);
      this.dialogController.update(delta, absolute);
    }

    if(!this.choiceModel.isHidden) {
      this.choiceModel.update(delta, absolute);
      this.choiceController.update(delta, absolute);
    }
  }
}