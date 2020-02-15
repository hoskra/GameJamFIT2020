import BaseScene from "../../scene-base";
import ISceneState from "../scene-interface";

abstract class BaseSceneState implements ISceneState {
    abstract init(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void): void;
    public scene: BaseScene;
    abstract transition(sceneName: string): BaseSceneState;
}

export default BaseSceneState;