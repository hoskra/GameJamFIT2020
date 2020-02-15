import BaseScene from "../scene-base";
import BaseSceneState from "./scenes/scene-state-base";

interface ISceneState {
    transition(sceneName: string): BaseSceneState;
    init(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void): void;
}

export default ISceneState;