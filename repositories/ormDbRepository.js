export class OrmDbRepository {
    constructor(model) {
        this.model = model;
    }

    async getItems() {
        return await this.model.findAll();
    }

    async getItemById(itemId) {
        return await this.model.findByPk(itemId);
    }

    async deleteItem(itemId) {
        return await this.model.destroy({
            where: {
                id: itemId,
            },
        });
    }

    async addItem(newItem) {
        return await this.model.create(newItem);
    }

    async updateItem(newItem) {
        return await newItem.save();
    }
}
