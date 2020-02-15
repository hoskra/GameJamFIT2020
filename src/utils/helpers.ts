import Vec from './vec';

export const mapCellToVector = (cell: number, columns: number) => {
  return new Vec(cell % columns, Math.floor(cell / columns));
};

export const vectorToMapCell = (vec: Vec, columns: number) => {
  return columns * vec.y + vec.x;
};

export const posToMapCell = (x: number, y: number, columns: number) => {
  return columns * y + x;
};