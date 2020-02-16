import { GameController } from './game-controller';
import { Keys, KeyController } from './key-controller';
import { ChoiceModel } from '../models/choice-model';

export class ChoiceController {
  private keyController: KeyController;
  choiceModel: ChoiceModel;
  onChoiceFinish: (answer: boolean) => void;

  constructor(keyController: KeyController) {
    this.keyController = keyController;
  }

  update(delta: number, absolute: number) {
    if(this.choiceModel.isHidden) {
      return;
    }

  
    if(this.keyController.isKeyPressed(Keys.KEY_LEFT)) {
      this.choiceModel.selectChoice(true);
    }
    if(this.keyController.isKeyPressed(Keys.KEY_RIGHT)) {
      this.choiceModel.selectChoice(false);
    }
    if(this.keyController.isKeyPressed(Keys.KEY_SPACE)) {
      this.choiceModel.hide();
      if(this.onChoiceFinish) {
        this.onChoiceFinish(this.choiceModel.currentChoiceYes);
        this.onChoiceFinish = null;
      }
    }
  }
}