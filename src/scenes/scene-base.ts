import * as PIXI from 'pixi.js';
import { MapParser } from '../parsers/map-parser';
import GameModel from '../models/game-model';
import { GameController } from '../controllers/game-controller';

abstract class BaseScene {
    public sceneObjects: PIXI.DisplayObject[] = [];
    gameController: GameController;
    gameModel: GameModel;
    app: PIXI.Application;
    resources = PIXI.Loader.shared.resources;
    mapParser = new MapParser();
    afterTransitionCallback: (nextScene: string) => void;

    constructor(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) {
        this.app = app;
        this.afterTransitionCallback = afterTransitionCallback;
        this.gameController = gameController;
        this.gameModel = gameModel;
    }

    abstract init(gameModel: GameModel);

    abstract update(delta: number, absolute: number);
}

export default BaseScene;