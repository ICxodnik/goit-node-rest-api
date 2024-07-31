const xid = require('xid-js');
const fs = require('fs').promises;

class FileDbRepository {

    constructor(itemsPath) {
        this.itemsPath = itemsPath;
    }
    async _update(data) {
        await fs.writeFile(this.itemsPath, JSON.stringify(data, null, 2), {
            encoding: "utf8",
            flag: "w"
        });
    }

    async getItems() {
        const result = await fs.readFile(this.itemsPath, 'utf8');
        return JSON.parse(result);
    }

    async getItemById(itemId) {
        const items = await this.getItems();
        return items.find(el => el.id == itemId);
    }

    async deleteItem(itemId) {
        const items = await this.getItems();
        const index = items.findIndex(el => el.id == itemId);
        if (index == -1) {
            return null;
        }
        const [deleted] = items.splice(index, 1);
        await this._update(items);
        return deleted;
    }

    async addItem(newItem) {
        newItem.id = xid.next();
        const items = await this.getItems();
        items.push(newItem);
        await this._update(items);

        return newItem;
    }

    async updateItem(newItem) {
        const items = await this.getItems();
        const index = items.findIndex(el => el.id == newItem.id);
        if (index == -1) {
            return null;
        }
        items[index] = newItem;
        await this._update(items);

        return newItem;
    }
}


module.exports = {
    FileDbRepository
}