import Vec from './utils/vec';
export enum Assets {
  EGO_MEC = 'EGO_MEC',
  EGO_MOC = 'EGO_MOC',
  EGO_SVET = 'EGO_SVET',
  EGO = 'EGO',
  MAG_CARY = 'MAG_CARY',
  MAG_OHEN = 'MAG_OHEN',
  MAG_SIKANA = 'MAG_SIKANA',
  MAG = 'MAG',
  NINJA_LUK = 'NINJA_LUK',
  NINJA_MOZEK = 'NINJA_MOZEK',
  NINJA_SVOBODA = 'NINJA_SVOBODA',
  NINJA = 'NINJA',
  TEXTURES = 'TEXTURES',
  MAP = 'MAP',
  HERO = 'HERO',
  DIALOG = 'DIALOG',
  FONT = 'FONT',
  INTRO = 'INTRO',
  BEER = 'BEER',
  DIALOG_NEXT = 'DIALOG_NEXT'
}

export enum Items {
  BEER = 80,
  CAN = 81,
  COINS = 82,
  DINO = 83,
  EMPTY_BOX = 84,
  FLOPPY_DISK = 85,
  NOTE = 86,
  PIZZA = 87,
  WEED = 88
}
export const itemEnumConv = (item: number) => {
  console.log(item);
  console.log(Items[item]);
  return Items[item];
};

export enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN
}

export const HERO_POS = new Vec(2, 5);
export const BLOCK_SIZE = 64;
export const TEXTURE_COLUMNS = 40;
export const SCALE_X = 2;
export const SCALE_Y = 2;
export const DIALOG_SIZE = 150;
export const FONT_SIZE = 60;

export const FONT_DIALOG_OFFSET_X = 30;
export const FONT_DIALOG_OFFSET_Y = 20;
