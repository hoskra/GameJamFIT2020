import BaseSceneState from "./scenes/scene-state-base";
import BaseScene from "../scene-base";
import CardSceneState from "./scenes/card-scene-state";
import GameModel from "../../models/game-model";

class SceneManager {
    state: BaseSceneState;
    gameModel: GameModel;

    constructor() {
        this.gameModel = new GameModel();
    }

    initFirst(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        this.state = new CardSceneState();
        //this.state = new FirstSceneState();
        this.state.init(app, afterTransitionCallback);
        this.state.scene.init(this.gameModel);
    }
    nextScene(sceneName: string, app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void): BaseScene {
        this.state = this.state.transition(sceneName);
        this.state.init(app, afterTransitionCallback);
        this.state.scene.init(this.gameModel);
        return this.state.scene;
    }

    update(delta: number, absolute: number) {
        this.state.scene.update(delta, absolute);
    }
}

export default SceneManager;