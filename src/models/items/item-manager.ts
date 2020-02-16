class ItemManager {
    items: string[];

    constructor() {
        this.items = [];
    }

    hasItem(itemName: string): boolean {
        return this.items.find(x => x === itemName) !== null;
    }

    getItem(itemName: string): string {
        return this.items.find(element => element === itemName);
    }

    addItem(item: string) {
        this.items.push(item);
    }

    removeItem(item: string) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
}

export default ItemManager;