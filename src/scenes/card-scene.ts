import BaseGameObject from "../models/objects/base-game-object";
import Visitor from "../rendering/visitor-interface";
import PathConfiguration from "../configs/paths";
import * as PIXI from 'pixi.js';

class CardScene extends BaseGameObject {
    public sceneObjects: PIXI.DisplayObject[];

    accept = function (visitor: Visitor) {
        visitor.visit(this);
    }

    constructor(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        super();
        this.sceneObjects = [];
        this.sceneObjects.push(this.buttonCreate(PathConfiguration.CardPath, 150, app.view.height / 2 - 150, "left", () => afterTransitionCallback("firstScene")));
        this.sceneObjects.push(this.buttonCreate(PathConfiguration.CardPath, app.view.width / 2 - 150, app.view.height / 2 - 150, "middle", () => afterTransitionCallback("firstScene")));
        this.sceneObjects.push(this.buttonCreate(PathConfiguration.CardPath, app.view.width / 2 + 300, app.view.height / 2 - 150, "right", () => afterTransitionCallback("firstScene")));
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
}

export default CardScene;