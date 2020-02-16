import { FirstSceneName, CardMasterSceneName, IntroSceneName } from '../scene-names';
import FirstScene from "../../first-scene";
import BaseSceneState from "./scene-state-base";
import BaseScene from "../../scene-base";
import GameModel from '../../../models/game-model';
import { GameController } from "../../../controllers/game-controller";
import { CardMasterScene } from '../../card-master-scene';
import FirstSceneState from './first-scene-state';
import IntroSceneState from './intro-scene-state';
import CastleScene from '../../castle-scene';

export class CastleSceneState extends BaseSceneState {
    init(app: PIXI.Application, gameModel: GameModel, gameController: GameController,  afterTransitionCallback: (nextScene: string) => void) : void {
        this.scene = new CastleScene(app, gameModel, gameController, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch(sceneName) {
            case IntroSceneName:
                return new IntroSceneState();
        }
    }
}

export default CastleSceneState;