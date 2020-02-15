import { GameController } from './../controllers/game-controller';
import * as PIXI from 'pixi.js';
import { MapParser } from "../parsers/map-parser";
import * as helpers from '../utils/helpers';
import BaseScene from "./scene-base";
import GameModel from '../models/game-model';

class FirstScene extends BaseScene {
    public sceneObjects: PIXI.DisplayObject[];

    gameModel: GameModel;
    gameController: GameController;

    constructor(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        super(app, afterTransitionCallback);
    }

    init() {
        this.gameModel = new GameModel();
        this.gameController = new GameController();
        this.gameModel.init(this.app, this.mapParser.loadMap(this.resources['MAP'].data), this.gameController);
        this.gameController.init(this.gameModel);
    }

    update(delta: number, absolute: number) {
        this.gameModel.update(delta, absolute);
        this.gameController.update(delta, absolute);
    }
}

export default FirstScene;