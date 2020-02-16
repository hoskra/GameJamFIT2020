import { HeroController } from './hero-controller';
import { KeyController, Keys } from './key-controller';
import GameModel from '../models/game-model';
import { CameraController } from './camera-controller';
import IntroModel, { IntroState } from '../models/intro-model';

export class IntroController {
  keyController: KeyController;
  introModel: IntroModel;

  init(introModel: IntroModel) {
    this.introModel = introModel;
    this.keyController = new KeyController();
    this.keyController.init();
  }

  destroy() {
    this.keyController.destroy();
  }

  isKeyPressed(keyCode: number) {
    return this.keyController.isKeyPressed(keyCode);
  }

  get pressedKeys() {
    return this.keyController.pressedKeys;
  }


  update(delta: number, absolute: number) {
    if(this.introModel.introState === IntroState.TEXT_ANIM || this.introModel.introState === IntroState.TEXT_ANIM_INPUT) {
      if(this.keyController.isKeyPressed(Keys.KEY_SPACE)) {
        this.introModel.displayIntroDialog();
      }
    }
  }
}