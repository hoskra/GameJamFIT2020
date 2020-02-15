import { HeroController } from './hero-controller';
import { KeyController } from './key-controller';
import GameModel from '../models/game-model';

export class GameController {
  private keyController: KeyController;
  private heroController: HeroController;
  private _gameModel: GameModel;

  constructor(gameModel: GameModel) {
    this._gameModel = gameModel;
    this.heroController = new HeroController(this);
    this.keyController = new KeyController();
  }

  init() {
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

  update(delta: number, absolute: number) {
    this.heroController.update(delta, absolute);
  }
}