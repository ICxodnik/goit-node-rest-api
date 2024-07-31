const { isNameValid, isEmailValid, isPhoneValid } = require("../helpers/validators");

class ContactService {
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
        if (!(data.name && data.email && data.phone)) { return "Insert all necessary fields"; }
        if (!isNameValid(data.name)) { return "Name is not valid"; }
        if (!isEmailValid(data.email)) { return "Email is not valid"; }
        if (!isPhoneValid(data.phone)) { return "Phone is not valid"; }

        const newContact = {
            ...data
        }
        return await this.#repository.addItem(newContact) || null;
    }

    async updateContact(contactId, data) {
        if (!contactId) { return "Id cannot be empty"; }
        if (data.name && !isNameValid(data.name)) { return "Name is not valid"; }
        if (data.email && !isEmailValid(data.email)) { return "Email is not valid"; }
        if (data.phone && !isPhoneValid(data.phone)) { return "Phone is not valid"; }

        let contact = await this.#repository.getItemById(contactId);
        if (!contact) { return null; }

        contact = {
            ...contact,
            ...data
        }

        return await this.#repository.updateItem(contact) || null;
    }
}

module.exports = {
    ContactService
}
