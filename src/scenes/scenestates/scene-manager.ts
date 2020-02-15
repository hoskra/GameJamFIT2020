import IScene from "./scene-interface";
import BaseSceneState from "./scenes/scene-state-base";
import BaseScene from "../scene-base";
import CardSceneState from "./scenes/card-scene-state";

class SceneManager {
    state: BaseSceneState;

    intiFirst(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        this.state = new CardSceneState();
        this.state.init(app, afterTransitionCallback);
    }
    nextScene(sceneName: string, app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void): BaseScene {
        this.state = this.state.transition(sceneName);
        this.state.init(app, afterTransitionCallback);
        return this.state.scene;
    }
}

export default SceneManager;