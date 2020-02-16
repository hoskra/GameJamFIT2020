import { FirstSceneName, CardSceneName } from "../scene-names";
import BaseSceneState from "./scene-state-base";
import IntroScene from "../../intro-scene";
import GameModel from '../../../models/game-model';
import CardSceneState from './card-scene-state';

class IntroSceneState extends BaseSceneState {
    init(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) : void {
        this.scene = new IntroScene(app, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch (sceneName) {
            case CardSceneName:
                return new CardSceneState();
        }
    }
}

export default IntroSceneState;