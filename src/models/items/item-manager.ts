class ItemManager {
    items: Item[];

    constructor() {
        this.items = [];
    }

    hasItem(itemName: string): boolean {
        return this.items.find(x => x.itemName === itemName) !== null;
    }

    getItem(itemName: string): Item {
        return this.items.find(element => element.itemName === itemName);
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    removeItem(item: Item) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
}

export default ItemManager;