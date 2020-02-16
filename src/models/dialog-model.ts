import { GameObjectModel } from './game-object-model';
import GameModel from './game-model';
import * as PIXI from 'pixi.js';
import { Assets, DIALOG_SIZE, FONT_SIZE, FONT_DIALOG_OFFSET_X, FONT_DIALOG_OFFSET_Y } from '../constants';
import * as helpers from '../utils/helpers';

export enum DialogState {
  ANIMATING,
  WAITING_FOR_INPUT,
  FINISHED
}
export class DialogModel extends GameObjectModel {

  state: DialogState;
  fullText: string;
  currentRow = 0;
  rowsNum = 0;
  displayedText: string;
  framedText: string;
  textObj: PIXI.Text;

  screenWidth: number;
  screenHeight: number;
  stage: PIXI.Container;
  nextIcon: PIXI.Sprite;

  textureHero: PIXI.Texture;
  textureNPC: PIXI.Texture;

  constructor(screenWidth: number, screenHeight: number, stage: PIXI.Container) {
    super(null);
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.stage = stage;
  }

  init() {
    this.state = DialogState.ANIMATING;
    this.textureNPC = PIXI.Texture.from(Assets.DIALOG_NPC);
    this.textureHero = PIXI.Texture.from(Assets.DIALOG_HERO);
    let sprite = new PIXI.NineSlicePlane(this.textureNPC, 60, 60, 60, 60);
    sprite.position.set(0, this.screenHeight);
    sprite.pivot.y = DIALOG_SIZE;
    this.stage.addChild(sprite);
    this.pixiObj = sprite;
    sprite.width = this.screenWidth;
    sprite.height = DIALOG_SIZE;

    this.textObj = new PIXI.Text('', new PIXI.TextStyle({ fontFamily: 'monospace', fontSize: FONT_SIZE , align: 'left' }));
    this.textObj.position.set(FONT_DIALOG_OFFSET_X, FONT_DIALOG_OFFSET_Y);

    let texture = PIXI.Texture.from(Assets.DIALOG_NEXT);
    this.nextIcon = new PIXI.Sprite(texture);
    this.nextIcon.position.set(sprite.width, sprite.height);
    this.nextIcon.anchor.set(2, 1.5);
    this.nextIcon.visible = false;
    sprite.addChild(this.nextIcon);

    sprite.addChild(this.textObj);

  }

  showText(text: string, isNPC: boolean) {
    if(isNPC) {
      (this.pixiObj as PIXI.Sprite).texture = this.textureNPC;
    } else {
      (this.pixiObj as PIXI.Sprite).texture = this.textureHero;
    }
    this.pixiObj.visible = true;
    this.state = DialogState.ANIMATING;
    this.fullText = helpers.wrapDialogText(text, FONT_SIZE, this.pixiObj.width);
    this.rowsNum = this.fullText.split('\n').length;
    console.log('rows num ' + this.rowsNum);
    this.currentRow = 0;
    this.displayedText = '';
    this.initFramedText();
  }

  showMore() {
    this.displayedText = '';
    this.state = DialogState.ANIMATING;
    this.initFramedText();
  }

  destroy() {

  }

  hide() {
    this.pixiObj.visible = false;
  }

  get isHidden() {
    return !this.pixiObj.visible;
  }

  flickerCounter = 0;

  update(delta: number, absolute: number) {
    if(!this.isHidden && this.state === DialogState.ANIMATING) {
      this.displayedText = this.framedText.substr(0, this.displayedText.length + 1);
      this.textObj.text = this.displayedText;
      if(this.displayedText.length === this.framedText.length) {
        this.currentRow += 2;
        if(this.currentRow < this.rowsNum) {
          this.state = DialogState.WAITING_FOR_INPUT;
        } else {
          this.state = DialogState.FINISHED;
        }
      }
    }

    if(this.state === DialogState.WAITING_FOR_INPUT || this.state == DialogState.FINISHED) {
      if(this.flickerCounter++ % 4 === 0) {
        this.nextIcon.visible = !this.nextIcon.visible;
      }
    } else {
      this.nextIcon.visible = false;
    }
  }

  private initFramedText() {
    let lines = this.fullText.split('\n');
    console.log(lines.length, this.currentRow + 2);
    if(lines.length >= (this.currentRow + 2)) {
      this.framedText = lines[this.currentRow] + '\n' + lines[this.currentRow + 1];
    } else if(lines.length === (this.currentRow + 1)) {
      // only 1 more line
      this.framedText = lines[this.currentRow];
    }
  }
}