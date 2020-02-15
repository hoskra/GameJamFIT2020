import BaseScene from "../../scene-base";
import GameModel from '../../../models/game-model';

abstract class BaseSceneState {
    abstract init(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void): void;
    public scene: BaseScene;
    abstract transition(sceneName: string): BaseSceneState;
}

export default BaseSceneState;