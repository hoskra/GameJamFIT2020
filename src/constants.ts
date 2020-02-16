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
  DIALOG_HERO = 'DIALOG_HERO',
  DIALOG_NPC = 'DIALOG_NPC',
  FONT = 'FONT',
  INTRO = 'INTRO',
  BEER = 'BEER',
  DIALOG_NEXT = 'DIALOG_NEXT',
  DIALOGS = 'DIALOGS',
  MORTUARYSCENEDIALOG = "MORTUARYSCENEDIALOG",
  NPC_CARDMASTER = 'NPC_CARDMASTER',
  NPC_THIEF= 'NPC_THIEF',
  NPC_SYSADMIN = 'NPC_SYSADMIN',
  NPC_HOMELESS = 'NPC_HOMELESS',
  NPC_TERREX = 'NPC_TERREX',
  NPC_JUNKIE = 'NPC_JUNKIE',
  NPC_ECOLOGIST = 'NPC_ECOLOGIST',
  ITEM_BEER = 'ITEM_BEER',
  ITEM_CAN = 'ITEM_CAN',
  ITEM_COINS = 'ITEM_COINS',
  ITEM_DINO = 'ITEM_DINO',
  ITEM_EMPTY_BOX = 'ITEM_EMPTY_BOX',
  ITEM_FLOPPY_DISK = 'ITEM_FLOPPY_DISK',
  ITEM_NOTE = 'ITEM_NOTE',
  ITEM_PIZZA = 'ITEM_PIZZA',
  ITEM_WEED = 'ITEM_WEED',
  MAIN_WINDOW_DIALOGUES = "MAIN_WINDOWS_DIALOUES",
  MAP_CARDMASTER = 'MAP_CARDMASTER',
  SELECT_TITLE = "SELECT_TITLE",
  ORACLE = 'ORACLE',
  ORACLE_MAG_WAR = 'ORACLE_MAG_WAR',
  ORACLE_ROGUE = 'ORACLE_ROGUE',
  SYS_ADMIN = 'SYS_ADMIN',
  SYS_ADMIN_MAGE = 'SYS_ADMIN_MAGE',
  SYS_ADMIN_ROGUE = 'SYS_ADMIN_ROGUE',
  SYS_ADMIN_WARRIOR = 'SYS_ADMIN_WARRIOR',
  EKO = 'EKO',
  EKO_ROGUE_WARRIROR = 'EKO_ROGUE_WARRIOR',
  EKO_MAGE = 'EKO_MAGE',
  BAD_KIDS = 'BAD_KIDS',
  BAD_KIDS_WARRIOR_ROGUE = 'BAD_KIDS_WARRIOR_ROGUE',
  BAD_KIDS_MAGE = 'BAD_KIDS_MAGE',
  DYNO = 'DYNO',
  DYBO_MAGE_ROGUE = 'DYNO_MAGE_ROGUE',
  DYNO_WAR = 'DYNO_WAR',
  WEIRD_GUY = 'WEIRD_GUY',
  WEIRD_GUY_WAR_MAGE = 'WEIRD_GUY_WAR_MAGE',
  WEIRD_GUY_ROGUE = 'WEIRD_GUY_ROGUE'
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

export const getItemAsset = (index: number) => {
  switch(index) {
    case Items.BEER:
      return Assets.ITEM_BEER;
      break;
    case Items.CAN:
      return Assets.ITEM_CAN;
      break;
    case Items.COINS:
      return Assets.ITEM_COINS;
      break;
    case Items.DINO:
      return Assets.ITEM_DINO;
      break;
    case Items.EMPTY_BOX:
      return Assets.ITEM_EMPTY_BOX;
      break;
    case Items.FLOPPY_DISK:
      return Assets.ITEM_FLOPPY_DISK;
      break;
    case Items.NOTE:
      return Assets.ITEM_NOTE;
      break;
    case Items.PIZZA:
        return Assets.ITEM_PIZZA;
        break;
    case Items.WEED:
        return Assets.ITEM_WEED;
        break;
  }
  throw new Error('Unknown NPC!');
}


export const NPC_CARDMASTER = 50;
export const NPC_THIEF= 51;
export const NPC_SYSADMIN = 52;
export const NPC_HOMELESS = 53;
export const NPC_TERREX = 54;
export const NPC_JUNKIE = 55;
export const NPC_ECOLOGIST = 56;

export const getNPCAsset = (index: number) => {
  switch(index) {
    case NPC_CARDMASTER:
      return Assets.NPC_CARDMASTER;
      break;
    case NPC_THIEF:
      return Assets.NPC_THIEF;
      break;
    case NPC_SYSADMIN:
      return Assets.NPC_SYSADMIN;
      break;
    case NPC_HOMELESS:
      return Assets.NPC_HOMELESS;
      break;
    case NPC_TERREX:
      return Assets.NPC_TERREX;
      break;
    case NPC_JUNKIE:
      return Assets.NPC_JUNKIE;
      break;
    case NPC_ECOLOGIST:
      return Assets.NPC_ECOLOGIST;
      break;
  }
  throw new Error('Unknown NPC!');
}

export const itemEnumConv = (item: number) => {
  return Items[item];
};

export enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN
}

export const BLOCK_SIZE = 64;
export const TEXTURE_COLUMNS = 40;
export const SCALE_X = 2;
export const SCALE_Y = 2;
export const DIALOG_SIZE = 150;
export const FONT_SIZE = 60;

export const FONT_DIALOG_OFFSET_X = 30;
export const FONT_DIALOG_OFFSET_Y = 20;
