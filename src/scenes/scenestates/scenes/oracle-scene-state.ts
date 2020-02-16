import { FirstSceneName, CardSceneName } from "../scene-names";
import FirstScene from "../../first-scene";
import BaseSceneState from "./scene-state-base";
import BaseScene from "../../scene-base";
import GameModel from '../../../models/game-model';
import MortuaryScene from "../../mortuary-scene";
import CardSceneState from './card-scene-state';
import { GameController } from "../../../controllers/game-controller";
import FirstSceneState from "./first-scene-state";

class OracleSceneState extends BaseSceneState {
    init(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) : void {
        super.init(app, gameModel, gameController, afterTransitionCallback);
        //this.scene = new OracleScene(app, gameModel, gameController, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch(sceneName) {
            case FirstSceneName:
                return new FirstSceneState();
        }
    }
}

export default OracleSceneState;