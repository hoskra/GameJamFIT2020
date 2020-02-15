import { FirstSceneName } from "../scene-names";
import FirstSceneState from "./first-scene-state";
import BaseSceneState from "./scene-state-base";
import CardScene from "../../card-scene";
import GameModel from '../../../models/game-model';

class CardSceneState extends BaseSceneState {
    init(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) : void {
        this.scene = new CardScene(app, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch (sceneName) {
            case FirstSceneName:
                return new FirstSceneState();
        }
    }
}

export default CardSceneState;