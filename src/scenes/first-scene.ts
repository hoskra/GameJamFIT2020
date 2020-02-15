import Visitor from "../rendering/visitor-interface";
import * as PIXI from 'pixi.js';
import { MapParser } from "../parsers/map-parser";
import * as helpers from '../utils/helpers';
import * as GameSettings from "../configs/game-setting";
import BaseScene from "./scene-base";

class FirstScene extends BaseScene {
    public sceneObjects: PIXI.DisplayObject[];

    accept = function (visitor: Visitor) {
        visitor.visit(this);
    }

    constructor(app: PIXI.Application, afterTransitionCallback: (nextScene: string) => void) {
        super(app, afterTransitionCallback);
        this.sceneObjects = [];
        let resources = PIXI.Loader.shared.resources;
        let mapParser = new MapParser();
        let map = mapParser.loadMap(resources['MAP'].data);

        for (let i = 0; i < map.blocks; i++) {
            let pos = helpers.mapCellToVector(i, map.columns);
            let cell = map.cells.get(i);

            let texture = PIXI.Texture.from('TEXTURES');
            texture = texture.clone();
            let sprite = new PIXI.Sprite(texture);
            let texturePos = helpers.mapCellToVector(cell.defaultTexture, GameSettings.TEXTURE_COLUMNS);
            sprite.texture.frame = new PIXI.Rectangle(texturePos.x * GameSettings.BLOCK_SIZE, texturePos.y * GameSettings.BLOCK_SIZE, GameSettings.BLOCK_SIZE, GameSettings.BLOCK_SIZE);
            sprite.position.set(pos.x * GameSettings.BLOCK_SIZE, pos.y * GameSettings.BLOCK_SIZE);
            this.sceneObjects.push(sprite);
        }
    }
}

export default FirstScene;