import { GameController } from './../controllers/game-controller';
import * as PIXI from 'pixi.js';
import BaseScene from "./scene-base";
import GameModel from '../models/game-model';

class GravediggerScene extends BaseScene {
    public sceneObjects: PIXI.DisplayObject[];

    constructor(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) {
        super(app, gameModel, gameController, afterTransitionCallback);
    }

    init() {
        this.gameModel.init(this.app, this.mapParser.loadMap(this.resources['MAP'].data), this.gameController);
        this.gameController.init(this.gameModel);
    }

    update(delta: number, absolute: number) {
        this.gameModel.update(delta, absolute);
        this.gameController.update(delta, absolute);
    }
}

export default GravediggerScene;