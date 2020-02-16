import { FirstSceneName, OracleSceneName } from "../scene-names";
import FirstScene from "../../first-scene";
import BaseSceneState from "./scene-state-base";
import BaseScene from "../../scene-base";
import GameModel from '../../../models/game-model';
import { GameController } from "../../../controllers/game-controller";
import GravediggerScene from "../../gravedigger-scene";
import OracleSceneState from "./oracle-scene-state";

class GraveDiggerSceneState extends BaseSceneState {
    init(app: PIXI.Application, gameModel: GameModel, gameController: GameController,  afterTransitionCallback: (nextScene: string) => void) : void {
        this.scene = new GravediggerScene(app, gameModel, gameController, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch(sceneName) {
            case OracleSceneName:
                return new OracleSceneState();
        }
    }
}

export default GraveDiggerSceneState;