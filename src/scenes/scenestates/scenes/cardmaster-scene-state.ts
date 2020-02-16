import { FirstSceneName, CardMasterSceneName } from '../scene-names';
import FirstScene from "../../first-scene";
import BaseSceneState from "./scene-state-base";
import BaseScene from "../../scene-base";
import GameModel from '../../../models/game-model';
import { GameController } from "../../../controllers/game-controller";
import { CardMasterScene } from '../../card-master-scene';

class CardMasterSceneState extends BaseSceneState {
    init(app: PIXI.Application, gameModel: GameModel, gameController: GameController,  afterTransitionCallback: (nextScene: string) => void) : void {
        this.scene = new CardMasterScene(app, gameModel, gameController, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch(sceneName) {
            case CardMasterSceneName:
                return new CardMasterSceneState();
        }
    }
}

export default CardMasterSceneState;