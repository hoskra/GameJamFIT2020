import Visitor from "../rendering/visitor-interface";
import * as PIXI from 'pixi.js';
import BaseScene from "./scene-base";
import { FirstSceneName } from "./scenestates/scene-names";
import { Assets } from '../constants';

class CardScene extends BaseScene {

    accept = function (visitor: Visitor) {
        visitor.visit(this);
    }

    constructor(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        super(app, afterTransitionCallback);
    }

    init() {
        this.sceneObjects = [];
        this.sceneObjects.push(this.buttonCreate(Assets.CARDS, 150, this.app.view.height / 2 - 150, "left", () => this.afterTransitionCallback(FirstSceneName)));
        this.sceneObjects.push(this.buttonCreate(Assets.CARDS, this.app.view.width / 2 - 150, this.app.view.height / 2 - 150, "middle", () => this.afterTransitionCallback(FirstSceneName)));
        this.sceneObjects.push(this.buttonCreate(Assets.CARDS, this.app.view.width / 2 + 300, this.app.view.height / 2 - 150, "right", () => this.afterTransitionCallback(FirstSceneName)));
    }

    private buttonCreate(path: string, position_x: number, position_y: number, text: string, callback: () => void) {
        var buttonEndTurn = new PIXI.Container();
        var button1 = new PIXI.Sprite(PIXI.Loader.shared.resources[path].texture);
        button1.scale.x = 0.5;
        button1.scale.y = 0.5;
        button1.interactive = true;
        button1.on('click', callback);
        buttonEndTurn.x = position_x;
        buttonEndTurn.y = position_y;
        buttonEndTurn.width = button1.width;
        buttonEndTurn.height = button1.height;

        buttonEndTurn.interactive = true;

        buttonEndTurn.addChild(button1);
        return buttonEndTurn;
    }

    update(delta: number, absolute: number) {

    }
}

export default CardScene;