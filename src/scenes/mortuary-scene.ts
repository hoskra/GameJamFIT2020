import * as PIXI from 'pixi.js';
import BaseScene from "./scene-base";
import IntroModel from '../models/intro-model';
import { IntroController } from '../controllers/intro-controller';
import { GameController } from '../controllers/game-controller';
import GameModel from '../models/game-model';
import { ComplexDialog } from '../models/complex-dialog';
import { Assets } from '../constants';
import { DialogManager } from '../models/dialog-manager';
import { CardSceneName } from './scenestates/scene-names';
import { KeyController } from '../controllers/key-controller';

class MortuaryScene extends BaseScene {
  manager: DialogManager;
  keyController: KeyController;

  constructor(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) {
    super(app, gameModel, gameController, afterTransitionCallback);
    this.keyController = new KeyController();
    this.keyController.init();
    this.manager = new DialogManager(app.screen.width, app.screen.height, app.stage, this.keyController);
  }

  init() {
    let dialogJSON = PIXI.Loader.shared.resources[Assets.MORTUARYSCENEDIALOG].data;
    let complexDialog = new ComplexDialog(dialogJSON.marnice_intro);

    this.manager.displayComplexDialog(complexDialog, () => {
      this.afterTransitionCallback(CardSceneName);
    });
  }

  update(delta: number, absolute: number) {
    this.manager.update(delta, absolute);;
  }
}

export default MortuaryScene;