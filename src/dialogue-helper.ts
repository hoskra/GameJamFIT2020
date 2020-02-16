import GameModel from "./models/game-model";
import { NPC_CARDMASTER, Assets, NPC_SYSADMIN, NPC_ECOLOGIST, NPC_TERREX, NPC_HOMELESS, NPC_THIEF, NPC_JUNKIE, Items } from './constants';
import { ComplexDialog } from "./models/complex-dialog";
import * as PIXI from 'pixi.js';

class DialogueHelper {
    getDialogueSequence(npcType: number, gameModel: GameModel) {
        switch (npcType) {
            case NPC_CARDMASTER:
                return this.getDialogueForOracle(gameModel);
            case NPC_SYSADMIN:
                return this.getDialogueForSysAdmin(gameModel);
            case NPC_ECOLOGIST:
                return this.getDialogueForEko(gameModel);
            case NPC_TERREX:
                return this.getDialogueForDyno(gameModel);
            case NPC_THIEF:
                return this.getDialogueForBadKids(gameModel);
            case NPC_JUNKIE:
                return this.getDialogueForWeirdGuy(gameModel);

        }
    }
    getDialogueForOracle(gameModel: GameModel) {
        let dialogMage = PIXI.Loader.shared.resources[Assets.MAIN_WINDOW_DIALOGUES];
        // zatim se nenastavuje
        if (gameModel.oracleSatisfied) {
            return new ComplexDialog(dialogMage.data.general);
        }
        // kontrola jestli nemá dost předmětů u sebe, pokud jo tak true -> dialog a získat případně klíč
        if (true) {
            switch (gameModel.heroType) {
                case 0:
                    return new ComplexDialog(dialogMage.data.oracle_war);
                case 1:
                    return new ComplexDialog(dialogMage.data.oracle_rogue);
                case 2:
                    return new ComplexDialog(dialogMage.data.oracle_mage);
            }
        }
        return new ComplexDialog(dialogMage.data.oracle);
    }
    getDialogueForSysAdmin(gameModel: GameModel) {
        let dialogMage = PIXI.Loader.shared.resources[Assets.MAIN_WINDOW_DIALOGUES].data;
        if (gameModel.sysAdminSatisfied) {
            return new ComplexDialog(dialogMage.general);
        }
        // kontrola jestli nemá dost předmětů u sebe, pokud jo tak true -> dialog a získat případně klíč
        if (gameModel.itemManager.ownedItems.get(Items.FLOPPY_DISK) >= 5) {
            switch (gameModel.heroType) {
                case 0:
                    return new ComplexDialog(dialogMage.sys_admin_mage);
                case 1:
                    return new ComplexDialog(dialogMage.sys_admin_rogue);
                case 2:
                    return new ComplexDialog(dialogMage.sys_admin_warrior);
            }
        }
        return new ComplexDialog(dialogMage.sys_admin);
    }
    getDialogueForDyno(gameModel: GameModel) {
        let dialogMage = PIXI.Loader.shared.resources[Assets.MAIN_WINDOW_DIALOGUES].data;
        if (gameModel.dynoSatisfied) {
            return new ComplexDialog(dialogMage.general);
        }
        // kontrola jestli nemá dost předmětů u sebe, pokud jo tak true -> dialog a získat případně klíč
        if (gameModel.itemManager.ownedItems.get(Items.NOTE) >= 5) {
            switch (gameModel.heroType) {
                case 0:
                    return new ComplexDialog(dialogMage.dyno_mage_rogue);
                case 1:
                    return new ComplexDialog(dialogMage.dyno_mage_rogue);
                case 2:
                    return new ComplexDialog(dialogMage.dyno_war);
            }
        }
        return new ComplexDialog(dialogMage.data.dyno);
    }
    getDialogueForWeirdGuy(gameModel: GameModel) {
        let dialogMage = PIXI.Loader.shared.resources[Assets.MAIN_WINDOW_DIALOGUES].data;
        if (gameModel.junkieSatisfied) {
            return new ComplexDialog(dialogMage.general);
        }
        // kontrola jestli nemá dost předmětů u sebe, pokud jo tak true -> dialog a získat případně klíč
        if (gameModel.itemManager.ownedItems.get(Items.WEED) >= 5) {
            switch (gameModel.heroType) {
                case 0:
                    return new ComplexDialog(dialogMage.weird_guy_war_mage);
                case 1:
                    return new ComplexDialog(dialogMage.weird_guy_rogue);
                case 2:
                    return new ComplexDialog(dialogMage.weird_guy_war_mage);
            }
        }
        return new ComplexDialog(dialogMage.weird_guy);
    }
    getDialogueForBadKids(gameModel: GameModel) {
        let dialogMage = PIXI.Loader.shared.resources[Assets.MAIN_WINDOW_DIALOGUES].data;
        if (gameModel.badKidsSatisfied) {
            return new ComplexDialog(dialogMage.general);
        }
        // kontrola jestli nemá dost předmětů u sebe, pokud jo tak true -> dialog a získat případně klíč
        if (gameModel.itemManager.ownedItems.get(Items.COINS) >= 5) {
            switch (gameModel.heroType) {
                case 0:
                    return new ComplexDialog(dialogMage.bad_kids_mage);
                case 1:
                    return new ComplexDialog(dialogMage.bad_kids_warrior_rogue);
                case 2:
                    return new ComplexDialog(dialogMage.bad_kids_warrior_rogue);
            }
        }
        return new ComplexDialog(dialogMage.bad_kids);
    }
    getDialogueForEko(gameModel: GameModel) {
        let dialogMage = PIXI.Loader.shared.resources[Assets.MAIN_WINDOW_DIALOGUES].data;
        if (gameModel.ekoSatisfied) {
            return new ComplexDialog(dialogMage.general);
        }
        // kontrola jestli nemá dost předmětů u sebe, pokud jo tak true -> dialog a získat případně klíč
        if (gameModel.itemManager.ownedItems.get(Items.BEER) >= 5) {
            switch (gameModel.heroType) {
                case 0:
                    return new ComplexDialog(dialogMage.eko_mage);
                case 1:
                    return new ComplexDialog(dialogMage.eko_rogue_warrior);
                case 2:
                    return new ComplexDialog(dialogMage.eko_rogue_warrior);
            }
        }
        return new ComplexDialog(dialogMage.eko);
    }
}

export default DialogueHelper;