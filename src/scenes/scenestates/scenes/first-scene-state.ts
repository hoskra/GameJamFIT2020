import { CastleSceneName, IntroSceneName } from '../scene-names';
import FirstScene from "../../first-scene";
import BaseSceneState from "./scene-state-base";
import BaseScene from "../../scene-base";
import GameModel from '../../../models/game-model';
import { GameController } from "../../../controllers/game-controller";
import { CastleSceneState } from './castle-scene-state';
import IntroSceneState from './intro-scene-state';

class FirstSceneState extends BaseSceneState {
    init(app: PIXI.Application, gameModel: GameModel, gameController: GameController,  afterTransitionCallback: (nextScene: string) => void) : void {
        this.scene = new FirstScene(app, gameModel, gameController, afterTransitionCallback);
    }
    transition(sceneName: string): BaseSceneState {
        switch(sceneName) {
            case CastleSceneName:
                return new CastleSceneState();
            case IntroSceneName:
                return new IntroSceneState();
        }
    }
}

export default FirstSceneState;