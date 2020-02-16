import BaseScene from "../../scene-base";
import GameModel from '../../../models/game-model';
import { GameController } from "../../../controllers/game-controller";

abstract class BaseSceneState {
    init(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void): void {
        this.gameController = gameController;
        this.gameModel = gameModel;
        this.app = app;
        this.afterTransitionCallback = afterTransitionCallback;
    }
    public scene: BaseScene;
    gameModel: GameModel;
    gameController: GameController;
    app: PIXI.Application;
    afterTransitionCallback: (nextScene: string) => void;
    abstract transition(sceneName: string): BaseSceneState;
}

export default BaseSceneState;