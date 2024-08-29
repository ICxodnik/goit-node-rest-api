import { ContactService } from "../services/contactsServices.js";
import ctrlWrapper from "../middleware/ctrlWrapper.js";

const service = new ContactService();

async function getAllContacts(req, res) {
    const items = await service.listContacts(req.user.id);
    res.json(items);
}

async function getOneContact(req, res) {
    const { id } = req.params;
    const result = await service.getContactById(req.user.id, id);
    res.json(result);
}

async function deleteContact(req, res) {
    const { id } = req.params;
    const result = await service.removeContact(req.user.id, id);
    res.json(result);
    res.status(200);
}

async function createContact(req, res) {
    req.body.ownerId = req.user.id;
    res.json(await service.addContact(req.body));
    res.status(201);
}

async function updateContact(req, res) {
    const { id } = req.params;
    const result = await service.updateContact(req.user.id, id, req.body);
    res.json(result);
}

async function updateStatusContact(req, res) {
    const { id } = req.params;
    const result = await service.updateStatusContact(req.user.id, id, req.body);
    res.json(result);
}

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};
