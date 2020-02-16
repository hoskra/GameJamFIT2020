import { FirstSceneName, CardSceneName, CardMasterSceneName } from '../scene-names';
import FirstSceneState from "./first-scene-state";
import BaseSceneState from "./scene-state-base";
import CardScene from "../../card-scene";
import GameModel from '../../../models/game-model';
import { GameController } from "../../../controllers/game-controller";
import CardMasterSceneState from './cardmaster-scene-state';

class CardSceneState extends BaseSceneState {
    init(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) : void {
        super.init(app, gameModel, gameController, afterTransitionCallback);
        this.scene = new CardScene(app, gameModel, gameController, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch (sceneName) {
            case CardMasterSceneName:
                return new CardMasterSceneState();
        }
    }
}

export default CardSceneState;