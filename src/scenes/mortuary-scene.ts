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

class MortuaryScene extends BaseScene {
  gameModel: GameModel;
  gameController: GameController;
  manager: DialogManager;

  constructor(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) {
    super(app, gameModel, gameController, afterTransitionCallback);

    this.gameController = new GameController();
    this.gameModel = new GameModel();
    this.gameModel.init(this.app, this.mapParser.loadMap(this.resources['MAP'].data), this.gameController, false);
    this.gameController.init(this.gameModel);
    this.manager = new DialogManager(this.gameModel, this.gameController);
  }

  init() {
    let dialogJSON = PIXI.Loader.shared.resources[Assets.MORTUARYSCENEDIALOG].data;
    let complexDialog = new ComplexDialog(dialogJSON.marnice_intro);
    console.log(complexDialog);

    this.manager.displayComplexDialog(complexDialog, () => {
      this.afterTransitionCallback(CardSceneName);
    });
  }

  update(delta: number, absolute: number) {
    this.gameModel.update(delta, absolute);
    this.gameController.update(delta, absolute);
    this.manager.update(delta, absolute);;
  }
}

export default MortuaryScene;