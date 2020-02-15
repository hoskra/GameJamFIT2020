import { FirstSceneName } from "../scene-names";
import FirstScene from "../../first-scene";
import BaseSceneState from "./scene-state-base";
import BaseScene from "../../scene-base";
import GameModel from '../../../models/game-model';

class FirstSceneState extends BaseSceneState {
    init(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) : void {
        this.scene = new FirstScene(app, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch(sceneName) {
            case FirstSceneName:
                return new FirstSceneState();
        }
    }
}

export default FirstSceneState;