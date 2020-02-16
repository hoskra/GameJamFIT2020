import { RawMap } from '../parsers/map-parser';
import * as PIXI from 'pixi.js';
import { IntroController } from '../controllers/intro-controller';
import { IntroDialogManager } from './intro-dialog-manager';
import { Assets } from '../constants';
import { GameObjectModel } from './game-object-model';
import { CardSceneName } from '../scenes/scenestates/scene-names';

export enum IntroState {
  TEXT_ANIM,
  TEXT_ANIM_INPUT,
  DIALOG_INTRO,
}

export default class IntroModel extends GameObjectModel {
  introController: IntroController;
  stage: PIXI.Container;
  introDialogManager: IntroDialogManager;
  screenWidth: number;
  screenHeight: number;
  onDialogFinished: (name: string) => void;
  introState: IntroState;

  constructor(app: PIXI.Application, introController: IntroController, onDialogFinished: (name: string) => void) {
    super(null);
    this.introState = IntroState.TEXT_ANIM;
    this.introController = introController;
    this.stage = app.stage;
    this.screenWidth = app.view.width;
    this.screenHeight = app.view.height;
    this.onDialogFinished = onDialogFinished;
  }

  init() {
    this.initScene();
    this.introDialogManager = new IntroDialogManager(this, this.introController);
  }

  destroy() {

  }

  get isPaused() {
    return this.introDialogManager.isDialogRunning;
  }

  initScene() {
    let texture = PIXI.Texture.from(Assets.INTRO);
    texture = texture.clone();
    let sprite = new PIXI.Sprite(texture);
    this.stage.addChild(sprite);
    this.pixiObj = sprite;
    sprite.alpha = 0;
  }

  displayIntroDialog() {
    this.pixiObj.visible = false;
    this.introState = IntroState.DIALOG_INTRO;
    this.introDialogManager.displayText('Hra začíná...', () => {
      this.introDialogManager.displayText('TODO tady bude nějaký krátký úvod...', () => {
        this.introDialogManager.displayText('A tady by mohl být nějaký další úvod', () => {
          this.introDialogManager.displayText('A tady by mohl být ještě nějaký úvod', () => {
            this.onDialogFinished(CardSceneName);
          });
        });
      });
    });
  }

  update(delta: number, absolute: number) {
    if(this.introState === IntroState.TEXT_ANIM) {
      this.pixiObj.alpha = Math.min(this.pixiObj.alpha + 0.0003 * delta, 1);
      if(this.pixiObj.alpha >= 1) {
        this.introState = IntroState.TEXT_ANIM_INPUT;
      }
    }

    if(this.introState === IntroState.DIALOG_INTRO) {
      this.introDialogManager.update(delta, absolute);
    }
  }
}