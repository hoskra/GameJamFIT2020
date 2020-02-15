import { GameController } from './game-controller';
import { Keys } from './key-controller';
import { ChoiceModel } from '../models/choice-model';

export class ChoiceController {
  private gameController: GameController;
  choiceModel: ChoiceModel;
  onChoiceFinish: (answer: boolean) => void;

  constructor(gameController: GameController) {
    this.gameController = gameController;
  }

  update(delta: number, absolute: number) {
    if(this.choiceModel.isHidden) {
      return;
    }

    if(this.gameController.isKeyPressed(Keys.KEY_LEFT)) {
      this.choiceModel.selectChoice(true);
    }
    if(this.gameController.isKeyPressed(Keys.KEY_RIGHT)) {
      this.choiceModel.selectChoice(false);
    }
    if(this.gameController.isKeyPressed(Keys.KEY_SPACE)) {
      this.choiceModel.hide();
      if(this.onChoiceFinish) {
        this.onChoiceFinish(this.choiceModel.currentChoiceYes);
        this.onChoiceFinish = null;
      }
    }
  }
}