import { GameController } from './../controllers/game-controller';
import * as PIXI from 'pixi.js';
import BaseScene from "./scene-base";
import GameModel, { MapType } from '../models/game-model';
import Vec from '../utils/vec';

class FirstScene extends BaseScene {
    public sceneObjects: PIXI.DisplayObject[];

    constructor(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) {
        super(app, gameModel, gameController, afterTransitionCallback);
    }

    init() {
        this.gameModel.init(MapType.MAIN_MAP, new Vec(2, 6), this.app, this.mapParser.loadMap(this.resources['MAP'].data), this.gameController, true, this.afterTransitionCallback);
        this.gameController.init(this.gameModel);
    }

    update(delta: number, absolute: number) {
        this.gameModel.update(delta, absolute);
        this.gameController.update(delta, absolute);
    }
}

export default FirstScene;