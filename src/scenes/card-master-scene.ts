import { GameController } from './../controllers/game-controller';
import * as PIXI from 'pixi.js';
import BaseScene from "./scene-base";
import GameModel, { MapType }  from '../models/game-model';
import Vec from '../utils/vec';

export class CardMasterScene extends BaseScene {
    public sceneObjects: PIXI.DisplayObject[];

    constructor(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) {
        super(app, gameModel, gameController, afterTransitionCallback);
    }

    init() {
        this.gameModel.init(MapType.CARDMASTER, new Vec(1, 2), this.app, this.mapParser.loadMap(this.resources['MAP_CARDMASTER'].data), this.gameController);
        this.gameController.init(this.gameModel);
    }

    update(delta: number, absolute: number) {
        this.gameModel.update(delta, absolute);
        this.gameController.update(delta, absolute);
    }
}

export default CardMasterScene;