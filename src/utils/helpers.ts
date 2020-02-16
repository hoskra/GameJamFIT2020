import { FONT_DIALOG_OFFSET_X } from './../constants';
import Vec from './vec';
import { Direction, BLOCK_SIZE } from '../constants';
import { GameObjectModel } from '../models/game-object-model';

export const mapCellToVector = (cell: number, columns: number) => {
  return new Vec(cell % columns, Math.floor(cell / columns));
};

export const vectorToMapCell = (vec: Vec, columns: number) => {
  return columns * vec.y + vec.x;
};

export const posToMapCell = (x: number, y: number, columns: number) => {
  return columns * y + x;
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

export const getDirection = (pos1: Vec, pos2: Vec) => {
  if(pos1.x < pos2.x) return Direction.RIGHT;
  if(pos1.x > pos2.x) return Direction.LEFT;
  if(pos1.y < pos2.y) return Direction.DOWN;
  return Direction.UP;
};

export const isAlmostAtCell = (realPos: Vec, cellPos: Vec) => {
  let realCellPos = cellPos.multiply(BLOCK_SIZE);
  return realCellPos.squareDistance(realPos) <= 10;
};

export const alignToCell = (obj: GameObjectModel, cellPos: Vec) => {
  let realCellPos = cellPos.multiply(BLOCK_SIZE);
  obj.pixiObj.position.set(realCellPos.x, realCellPos.y);
};

export const wrapDialogText = (text: string, fontSize: number, dialogWidth: number) => {
  let width = dialogWidth;
  let offset = FONT_DIALOG_OFFSET_X * 2;
  let lettersPerRow = Math.ceil((width - offset) / fontSize * 1.6);
  let output = '';

  let words = text.split(' ');
  let currentLine = '';
  let index = 0;

  for(let word of words) {
    if((currentLine.length + word.length) > lettersPerRow) {
      if(output.length === 0) {
        output += currentLine;
      } else {
        output += '\n'+currentLine;
      }
      currentLine = '';
    }

    if(currentLine.length === 0) {
      currentLine += word;
    } else {
      currentLine += ' ' + word;
    }
  }


  if(output.length === 0) {
    output += currentLine;
  } else {
    output += '\n'+currentLine;
  }

  return output;
};