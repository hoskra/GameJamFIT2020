import { GameController } from './game-controller';
import { HeroModel, HeroState } from '../models/hero-model';
import { MapModel } from '../models/map-model';
import { Keys } from './key-controller';

export class HeroController {
  private gameController: GameController;
  private heroModel: HeroModel;
  private mapModel: MapModel;

  constructor(gameController: GameController) {
    this.gameController = gameController;
    this.heroModel = this.gameController.gameModel.hero;
    this.mapModel = this.gameController.gameModel.gameMap;
  }

  update(delta: number, absolute: number) {
    if(this.gameController.gameModel.isPaused) {
      return;
    }

    if (this.heroModel.state === HeroState.STANDING) {
      if (this.gameController.isKeyPressed(Keys.KEY_LEFT) && this.mapModel.canGoLeft(this.heroModel.mapPos)) {
        this.heroModel.walkLeft();
      }
      if (this.gameController.isKeyPressed(Keys.KEY_RIGHT) && this.mapModel.canGoRight(this.heroModel.mapPos)) {
        this.heroModel.walkRight();
      }
      if (this.gameController.isKeyPressed(Keys.KEY_UP) && this.mapModel.canGoUp(this.heroModel.mapPos)) {
        this.heroModel.walkUp();
      }
      if (this.gameController.isKeyPressed(Keys.KEY_DOWN) && this.mapModel.canGoDown(this.heroModel.mapPos)) {
        this.heroModel.walkDown();
      }
      if (this.mapModel.isItemTile(this.heroModel.mapPos)) {
        this.gameController.pickUpItem(this.heroModel.mapPos);
      }

      if(this.gameController.isKeyPressed(Keys.KEY_S)) {
        this.gameController.gameModel.dialogManager.displayText('Tož to nestíháš. Mám pravdu?', () => {
          this.gameController.gameModel.dialogManager.displayChoice((yes) => {
          });
        });
      }
      // testing purpose
      if (this.gameController.isKeyPressed(Keys.KEY_Q)) {
        this.gameController.gameModel.switchGlitchFilter();
      }
    }
  }
}