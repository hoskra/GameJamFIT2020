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
}