import { AppError, errorTypes } from "../errors/appError.js";
import * as db from "../db/index.js";

export class ContactService {
    defaultLimit = 20;

    async listContacts(filters) {
        let searchStr = {
            ownerId: filters.ownerId,
        };
        let query = {
            where: searchStr,
            limit: this.defaultLimit,
            offset: 0,
        };

        if (filters.favorite) {
            searchStr.favorite = true;
        }
        if (filters.limit) {
            query.limit = +filters.limit;
        }
        if (filters.page) {
            query.offset = query.limit * (filters.page - 1);
        }

        return await db.Contact.findAll(query);
    }

    async getContactById(ownerId, contactId) {
        const contact = await db.Contact.findByPk(contactId);
        if (!contact) {
            throw new AppError(errorTypes.NOT_FOUND, "Not found contact" + contactId);
        }
        if (contact.ownerId != ownerId) {
            throw new AppError(errorTypes.UNAUTHORIZED, "Not authorized");
        }
        return contact;
    }

    async removeContact(ownerId, contactId) {
        const contact = await db.Contact.destroy({
            where: {
                id: contactId,
                ownerId,
            },
        });
        if (!contact) {
            throw new AppError(errorTypes.UNAUTHORIZED, "Not authorized");
        }
        return "Contact " + contactId + " was successfully deleted";
    }

    async addContact(newContact) {
        const contact = await db.Contact.create(newContact);
        return contact;
    }

    async updateContact(ownerId, contactId, data) {
        let contact = await db.Contact.findByPk(contactId);
        if (!contact) {
            throw new AppError(errorTypes.NOT_FOUND, "Not found contact" + contactId);
        }
        if (contact.ownerId != ownerId) {
            throw new AppError(errorTypes.UNAUTHORIZED, "Not authorized");
        }

        Object.assign(contact, data);

        return await contact.save();
    }

    async updateStatusContact(ownerId, contactId, data) {
        let contact = await db.Contact.findByPk(contactId);
        if (!contact) {
            throw new AppError(errorTypes.NOT_FOUND, "Not found contact" + contactId);
        }
        if (contact.ownerId != ownerId) {
            throw new AppError(errorTypes.UNAUTHORIZED, "Not authorized");
        }
        if (contact.favorite == data.favorite) {
            return contact;
        }

        contact.favorite = data.favorite;
        return await contact.save();
    }
}
