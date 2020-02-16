
export interface ComplexDialog {
  NPC: string;
  hero: string;
}

export class ComplexDialog {
  dialog: ComplexDialog[];
  currentIndex = 0;

  constructor(dialog: ComplexDialog[]) {
    this.dialog = dialog;
    this.currentIndex = 0;
  }

  hasNext() {
    return this.currentIndex < this.dialog.length;
  }

  getNextNPC(): string {
    return this.dialog[this.currentIndex].NPC;
  }

  getNextHero(): string {
    let output = this.dialog[this.currentIndex].hero;
    this.currentIndex++;
    return output;
  }
}