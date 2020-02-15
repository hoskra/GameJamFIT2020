import Visitor from "../rendering/visitor-interface";
import * as PIXI from 'pixi.js';
import GameModel from '../models/game-model';

abstract class BaseScene {
    public sceneObjects: PIXI.DisplayObject[] = [];
    app: PIXI.Application;
    afterTransitionCallback: (nextScene: string) => void;

    constructor(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        this.app = app;
        this.afterTransitionCallback = afterTransitionCallback;
    }

    abstract init();

    accept = function (visitor: Visitor) {
        visitor.visit(this);
    };

    abstract update(delta: number, absolute: number);
}

export default BaseScene;