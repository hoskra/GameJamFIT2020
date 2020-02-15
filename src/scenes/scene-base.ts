import * as PIXI from 'pixi.js';
import { MapParser } from '../parsers/map-parser';

abstract class BaseScene {
    public sceneObjects: PIXI.DisplayObject[] = [];
    app: PIXI.Application;
    resources = PIXI.Loader.shared.resources;
    mapParser = new MapParser();
    afterTransitionCallback: (nextScene: string) => void;

    constructor(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        this.app = app;
        this.afterTransitionCallback = afterTransitionCallback;
    }

    abstract init();

    abstract update(delta: number, absolute: number);
}

export default BaseScene;