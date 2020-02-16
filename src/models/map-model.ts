import { RawMap, RawMapTile } from '../parsers/map-parser';
import Vec from '../utils/vec';

export class MapModel {
  rawMap: RawMap;

  constructor(rawMap: RawMap) {
    this.rawMap = rawMap;
  }

  getTile(pos: Vec): RawMapTile {
    return this.rawMap.getCell(pos);
  }

  canGoLeft(pos: Vec) {
    return this.rawMap.getCell(new Vec(pos.x - 1, pos.y)).isWalkable;
  }

  canGoRight(pos: Vec) {
    return this.rawMap.getCell(new Vec(pos.x + 1, pos.y)).isWalkable;
  }

  canGoUp(pos: Vec) {
    return this.rawMap.getCell(new Vec(pos.x, pos.y - 1)).isWalkable;
  }

  canGoDown(pos: Vec) {
    return this.rawMap.getCell(new Vec(pos.x, pos.y + 1)).isWalkable;
  }

  isItemTile(pos: Vec) {
    return this.rawMap.getCell(new Vec(pos.x, pos.y)).specialFunction >= 80;
  }
  getItem(pos: Vec) {
    let item = this.rawMap.getCell(new Vec(pos.x, pos.y)).specialFunction;
    this.rawMap.getCell(new Vec(pos.x, pos.y)).specialFunction = 0;
    return item;
  }
}