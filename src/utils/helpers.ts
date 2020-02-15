import Vec from './vec';
import { BLOCK_SIZE } from '../models/game-model';

export const mapCellToVector = (cell: number, columns: number) => {
  return new Vec(cell % columns, Math.floor(cell / columns));
};

export const vectorToMapCell = (vec: Vec, columns: number) => {
  return columns * vec.y + vec.x;
};

export const posToMapCell = (x: number, y: number, columns: number) => {
  return columns * y + x;
};

export const distanceToCell(obj: PIXI.Container, cell: Vec) {

}

export const alignObjectToCell = (obj: PIXI.Container, cell: Vec) => {
  let currentPos = new Vec(obj.position.x, obj.position.y);
  let blockSize = BLOCK_SIZE;

};

export const horizontalIntersection = (obj1: PIXI.Container, obj2: PIXI.Container) => {
  let boundsA = obj1.getLocalBounds();
  let boundsB = obj2.getLocalBounds();
  return Math.min(boundsA.x + boundsA.width, boundsB.x + boundsB.width) - Math.max(boundsA.x, boundsB.x);
};

export const verticalIntersection = (obj1: PIXI.Container, obj2: PIXI.Container) => {
  let boundsA = obj1.getLocalBounds();
  let boundsB = obj2.getLocalBounds();
  return Math.min(boundsA.y + boundsA.height, boundsB.y + boundsB.height) - Math.max(boundsA.y, boundsB.y);
};

export const intersects = (obj1: PIXI.Container, obj2: PIXI.Container, tolerance: number = 0) => {
  return horizontalIntersection(obj1, obj2) >= -tolerance && verticalIntersection(obj1, obj2) >= -tolerance;
};

export const intersection = (obj1: PIXI.Container, obj2: PIXI.Container, tolerance: number = 0) => {
  return horizontalIntersection(obj1, obj2) * verticalIntersection(obj1, obj2);
};

export const horizontalIntersectionRect = (boundsA: PIXI.Rectangle, boundsB: PIXI.Rectangle) => {
  return Math.min(boundsA.x + boundsA.width, boundsB.x + boundsB.width) - Math.max(boundsA.x, boundsB.x);
};

export const verticalIntersectionRect = (boundsA: PIXI.Rectangle, boundsB: PIXI.Rectangle) => {
  return Math.min(boundsA.y + boundsA.height, boundsB.y + boundsB.height) - Math.max(boundsA.y, boundsB.y);
};

export const intersectionRect = (obj1: PIXI.Rectangle, obj2: PIXI.Rectangle, tolerance: number = 0) => {
  return horizontalIntersectionRect(obj1, obj2) * this.verticalIntersectionRect(obj1, obj2);
};