import GameModel from "./models/game-model";
import { NPC_CARDMASTER, Assets, NPC_SYSADMIN } from "./constants";
import { ComplexDialog } from "./models/complex-dialog";
import * as PIXI from 'pixi.js';

class DialogueHelper {
    getDialogueSequence(npcType: number, gameModel: GameModel) {
        switch (npcType) {
            case NPC_CARDMASTER:
                return this.getDialogueForOracle(gameModel);
            case NPC_SYSADMIN:
                return this.getDialogueForSysAdmin(gameModel);
        }
    }
    getDialogueForOracle(gameModel: GameModel) {
        let dialogMage = PIXI.Loader.shared.resources[Assets.MAIN_WINDOW_DIALOGUES];
        console.log(dialogMage);
        if (true)
        {
            switch (gameModel.heroType) {
                case 0:
                    return new ComplexDialog(dialogMage.data.oracle_mag_war);
                case 1:
                    return new ComplexDialog(dialogMage.data.oracle_rogue);
                case 2:
                    return new ComplexDialog(dialogMage.data.oracle_mag_war);
            }
        }
        return new ComplexDialog(dialogMage.data.oracle);
    }
    getDialogueForSysAdmin(gameModel: GameModel) {
        let dialogMage = PIXI.Loader.shared.resources[Assets.MAIN_WINDOW_DIALOGUES].data;
        if (true)
        {
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
}

export default DialogueHelper;