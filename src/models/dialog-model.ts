import { GameObjectModel } from './game-object-model';
import { BLOCK_SIZE, HERO_POS } from './game-model';
import GameModel from './game-model';
import * as PIXI from 'pixi.js';
import Vec from '../utils/vec';
import { MoveAnim } from '../animators/move-anim';
import { Assets } from '../constants';

export class DialogModel extends GameObjectModel {


  constructor(gameModel: GameModel) {
    super(gameModel);
  }

  init() {
    setTimeout(() => {
      let texture = PIXI.Texture.from(Assets.DIALOG);
      texture = texture.clone();
      let sprite = new PIXI.NineSlicePlane(texture, 20, 20, 20, 20);
      sprite.position.set(HERO_POS.x * BLOCK_SIZE, HERO_POS.y * BLOCK_SIZE);
      this.gameModel.stage.addChild(sprite);
      this.pixiObj = sprite;
      sprite.width = 500;
      sprite.height = 200;
  
      let text = new PIXI.Text('Tak zkus něco udělat. Třeba\n na něco přijdeš.', { font: { size: 32 }, align: 'left' });
      text.position.set(50, 50);
      sprite.addChild(text);
    }, 2000);

  }

  destroy() {

  }

  update(delta: number, absolute: number) {
  }
}