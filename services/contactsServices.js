
export class ContactService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }
    async listContacts() {
        return await this.#repository.getItems();
    }

    async getContactById(contactId) {
        const contact = await this.#repository.getItemById(contactId);
        return contact || null;
    }

    async removeContact(contactId) {
        const contact = await this.#repository.deleteItem(contactId);
        return contact || null;
    }

    async addContact(data) {
        const newContact = {
            ...data
        }
        return await this.#repository.addItem(newContact) || null;
    }

    async updateContact(contactId, data) {
        let contact = await this.#repository.getItemById(contactId);
        if (!contact) { return null; }

        Object.assign(contact, data);

        return await this.#repository.updateItem(contact) || null;
    }
}