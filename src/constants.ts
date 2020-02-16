export enum Assets {
  CARDS = 'CARDS',
  TEXTURES = 'TEXTURES',
  MAP = 'MAP',
  HERO = 'HERO',
  DIALOG = 'DIALOG',
  FONT = 'FONT',
  BEER = 'BEER'
}

export enum Items {
  SWORD = 80
}
export const itemEnumConv = (item: number) => {
  console.log(item);
  console.log(Items[item]);
  return Items[item];
}

export enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN
}

export const BLOCK_SIZE = 64;
export const TEXTURE_COLUMNS = 16;
export const SCALE_X = 2;
export const SCALE_Y = 2;
export const DIALOG_SIZE = 150;
export const FONT_SIZE = 60;

export const FONT_DIALOG_OFFSET_X = 30;
export const FONT_DIALOG_OFFSET_Y = 20;
