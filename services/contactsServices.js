import { AppError, errorTypes } from "../errors/AppError.js";
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
        if (!contact) {
            throw new AppError(errorTypes.NOT_FOUND, "Not found contact" + contactId);
        }
        return contact;
    }

    async removeContact(contactId) {
        const contact = await this.#repository.deleteItem(contactId);
        if (!contact) {
            throw new AppError(errorTypes.NOT_FOUND, "Not found contact" + contactId);
        }
        return "Contact " + contactId + " was successfully deleted";
    }

    async addContact(data) {
        const newContact = {
            ...data,
        };
        const contact = await this.#repository.addItem(newContact);
        if (!contact) {
            throw new AppError(errorTypes.NOT_FOUND, "Not found contact" + contactId);
        }
        return contact;
    }

    async updateContact(contactId, data) {
        let contact = await this.#repository.getItemById(contactId);
        if (!contact) {
            throw new AppError(errorTypes.NOT_FOUND, "Not found contact" + contactId);
        }

        Object.assign(contact, data);

        return await this.#repository.updateItem(contact);
    }

    async updateStatusContact(contactId, data) {
        let contact = await this.#repository.getItemById(contactId);
        if (!contact) {
            throw new AppError(errorTypes.NOT_FOUND, "Not found contact" + contactId);
        }
        if (contact.favorite == data.favorite) {
            return contact;
        }

        contact.favorite = data.favorite;
        return await this.#repository.updateItem(contact);
    }
}
