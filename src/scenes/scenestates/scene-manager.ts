import BaseSceneState from "./scenes/scene-state-base";
import BaseScene from "../scene-base";
import CardSceneState from "./scenes/card-scene-state";
import GameModel from '../../models/game-model';
import FirstSceneState from "./scenes/first-scene-state";

class SceneManager {
    state: BaseSceneState;

    initFirst(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        this.state = new CardSceneState();
        //this.state = new FirstSceneState();
        this.state.init(app, afterTransitionCallback);
        this.state.scene.init();
    }
    nextScene(sceneName: string, app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void): BaseScene {
        this.state = this.state.transition(sceneName);
        this.state.init(app, afterTransitionCallback);
        this.state.scene.init();
        return this.state.scene;
    }

    update(delta: number, absolute: number) {
        this.state.scene.update(delta, absolute);
    }
}

export default SceneManager;