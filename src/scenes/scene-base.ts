import BaseGameObject from "../models/objects/base-game-object";
import Visitor from "../rendering/visitor-interface";
import * as PIXI from 'pixi.js';

abstract class BaseScene extends BaseGameObject {
    public sceneObjects: PIXI.DisplayObject[];

    accept = function (visitor: Visitor) {
        visitor.visit(this);
    }

    constructor(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        super();
    }
}

export default BaseScene;