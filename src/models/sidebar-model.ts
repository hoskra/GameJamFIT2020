import { GameObjectModel } from './game-object-model';
import GameModel from './game-model';
import * as PIXI from 'pixi.js';
import { Assets } from '../constants';

export class SidebarModel extends GameObjectModel {

  valueText: PIXI.Text;
  timeout: PIXI.Text;
  icon: PIXI.Sprite;

  constructor(gameModel: GameModel) {
    super(gameModel);
  }

  init() {
    let layout = new PIXI.Graphics();
    this.pixiObj = layout;
    layout.beginFill(0x000000, 0.5);
    layout.position.set(this.gameModel.screenWidth * 0.75, 0);
    layout.drawRect(0,0, this.gameModel.screenWidth * 0.25, this.gameModel.screenHeight * 0.5);
    layout.endFill();

    let texture: PIXI.Texture;
    texture = PIXI.Texture.from(Assets.ICON_DAY);
    this.icon = new PIXI.Sprite(texture);
    this.icon.position.set(this.gameModel.screenWidth * 0.25 * 0.5, 80);
    this.icon.anchor.set(0.5);
    layout.addChild(this.icon);


    let infoText = new PIXI.Text('Mince\nMateriál\nTokeny', new PIXI.TextStyle({ fontFamily: 'monospace', fill: 0xFFFFFF, fontSize: 50 , align: 'left' }));
    infoText.position.set(20, 300);
    layout.addChild(infoText);

    this.valueText = new PIXI.Text('20\n60\n1/5', new PIXI.TextStyle({ fontFamily: 'monospace', fill: 0xFFFFFF, fontSize: 50 , align: 'right' }));
    this.valueText.position.set(300, 300);
    layout.addChild(this.valueText);

    this.timeout = new PIXI.Text('', new PIXI.TextStyle({ fontFamily: 'monospace', fill: 0xFFFFFF, fontSize: 40 , align: 'right' }));
    this.timeout.position.set(20, 100);
    layout.addChild(this.timeout);

    this.gameModel.stage.addChild(layout);
  }

  destroy() {

  }

  update(delta: number, absolute: number) {
    let coins = 20;
    let material = 60;
    let tokens = 1;
    this.valueText.text = coins + '\n' + material + '\n' + tokens;

    if(this.gameModel.isDay) {
      this.icon = new PIXI.Sprite(PIXI.Texture.from(Assets.ICON_DAY));
      this.timeout.text = 'Den končí za ' + Math.floor((this.gameModel.dayTime - absolute)/1000) + 's';
    } else {
      this.icon = new PIXI.Sprite(PIXI.Texture.from(Assets.ICON_NIGHT));
      this.timeout.text = 'Noc končí za ' + Math.floor((this.gameModel.dayTime - absolute)/1000) + 's';
    }
  }
}