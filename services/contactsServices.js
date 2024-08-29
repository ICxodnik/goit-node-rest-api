import { AppError, errorTypes } from "../errors/appError.js";
import * as db from "../db/index.js";

export class ContactService {
    async listContacts(ownerId) {
        return await db.Contact.findAll({
            where: {
                ownerId: ownerId,
            },
        });
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
