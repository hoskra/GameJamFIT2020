import { HeroController } from './hero-controller';
import { KeyController } from './key-controller';
import GameModel from '../models/game-model';
import { CameraController } from './camera-controller';
import Vec from '../utils/vec';
import { itemEnumConv } from '../constants';

export class GameController {

  private keyController: KeyController;
  private heroController: HeroController;
  private cameraController: CameraController;
  private _gameModel: GameModel;

  constructor() {

  }

  init(gameModel: GameModel) {
    this._gameModel = gameModel;
    this._gameModel.gameController = this;
    this.heroController = new HeroController(this);
    this.keyController = new KeyController();
    this.cameraController = new CameraController(this);
    this.keyController.init();
  }

  destroy() {
    this.keyController.destroy();
  }

  isKeyPressed(keyCode: number) {
    return this.keyController.isKeyPressed(keyCode);
  }

  get pressedKeys() {
    return this.keyController.pressedKeys;
  }

  get gameModel() {
    return this._gameModel;
  }
  pickUpItem(mapPos: Vec) {
    let itemNumber = this._gameModel.gameMap.getItem(mapPos);
    itemEnumConv(itemNumber);
    //this._gameModel.itemManager.addItem();
  }

  update(delta: number, absolute: number) {
    this.cameraController.update(delta, absolute);
    this.heroController.update(delta, absolute);
  }
}