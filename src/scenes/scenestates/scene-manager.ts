import BaseSceneState from "./scenes/scene-state-base";
import BaseScene from "../scene-base";
import CardSceneState from "./scenes/card-scene-state";
import GameModel from "../../models/game-model";
import IntroSceneState from './scenes/intro-scene-state';
import { GameController } from "../../controllers/game-controller";
import MortuaryScene from "../mortuary-scene";

class SceneManager {
    state: BaseSceneState;
    gameModel: GameModel;
    gameController: GameController;

    constructor() {
        this.gameModel = new GameModel();
        this.gameController = new GameController();
    }

    initFirst(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        this.state = new IntroSceneState();

        this.state.init(app, this.gameModel, this.gameController, afterTransitionCallback);
        this.state.scene.init(this.gameModel);
    }
    nextScene(sceneName: string, app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void): BaseScene {
        this.state = this.state.transition(sceneName);
        this.state.init(app, this.gameModel, this.gameController, afterTransitionCallback);
        this.state.scene.init(this.gameModel);
        return this.state.scene;
    }

    update(delta: number, absolute: number) {
        this.state.scene.update(delta, absolute);
    }
}

export default SceneManager;