import * as PIXI from 'pixi.js';
import BaseScene from "./scene-base";
import { FirstSceneName, CardMasterSceneName } from './scenestates/scene-names';
import { Assets } from '../constants';
import { KeyController, Keys } from '../controllers/key-controller';
import GameModel from '../models/game-model';
import { GameController } from '../controllers/game-controller';

class CardScene extends BaseScene {
    private currentCardIndex = 0;
    private rectangles: PIXI.Graphics[] = [];
    private keyController: KeyController;

    constructor(app: PIXI.Application, gameModel: GameModel, gameController: GameController, afterTransitionCallback: (nextScene: string) => void) {
        super(app, gameModel, gameController, afterTransitionCallback);
    }

    init() {
        this.sceneObjects = [];
        this.rectangles = [];

        let texture = PIXI.Texture.from(Assets.SELECT_TITLE);
        let sprite = new PIXI.Sprite(texture);
        sprite.position.set(this.app.screen.width / 2);
        sprite.anchor.set(0.5);
        this.app.stage.addChild(sprite);

        this.sceneObjects.push(this.buttonCreate(Assets.MAG, 150, this.app.view.height / 2 - 150, "left"));
        this.sceneObjects.push(this.buttonCreate(Assets.NINJA, this.app.view.width / 2 - 150, this.app.view.height / 2 - 150, "middle"));
        this.sceneObjects.push(this.buttonCreate(Assets.EGO, this.app.view.width / 2 + 300, this.app.view.height / 2 - 150, "right"));
        this.keyController = new KeyController();
        this.keyController.init();
    }

    private buttonCreate(path: string, position_x: number, position_y: number, text: string) {
        let buttonEndTurn = new PIXI.Container();
        let button1 = new PIXI.Sprite(PIXI.Loader.shared.resources[path].texture);
        button1.scale.x = 1.5;
        button1.scale.y = 1.5;
        buttonEndTurn.x = position_x;
        buttonEndTurn.y = position_y;
        buttonEndTurn.width = button1.width;
        buttonEndTurn.height = button1.height;

        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFF0000);
        graphics.alpha = 0.5;
        graphics.drawRect(0, 0, button1.width * 1.1, button1.height * 1.1);
        graphics.pivot.set(button1.width * 0.05);
        graphics.endFill();
        graphics.visible = false;
        this.rectangles.push(graphics);
        buttonEndTurn.addChild(graphics);
        buttonEndTurn.addChild(button1);
        return buttonEndTurn;
    }

    flickerIndex = 0;
    update(delta: number, absolute: number) {

        if(this.flickerIndex++ %6 === 0) {
            this.rectangles[this.currentCardIndex].visible = !this.rectangles[this.currentCardIndex].visible;
        }

        if(this.keyController.isKeyPressed(Keys.KEY_LEFT)) {
            this.rectangles[this.currentCardIndex].visible = false;
            if(this.currentCardIndex !== 0) {
                this.currentCardIndex--;
            }
            this.keyController.setKeyHandled(Keys.KEY_LEFT);
        }else if(this.keyController.isKeyPressed(Keys.KEY_RIGHT)) {
            this.rectangles[this.currentCardIndex].visible = false;
            if(this.currentCardIndex < 2) {
                this.currentCardIndex++;
            }
            this.keyController.setKeyHandled(Keys.KEY_RIGHT);
        } else if(this.keyController.isKeyPressed(Keys.KEY_SPACE)) {
            // todo distinguish the scene
            this.afterTransitionCallback(CardMasterSceneName);
        }
    }
}

export default CardScene;