import { ContactService } from "../services/contactsServices.js";
import { FileDbRepository } from "../repositories/fileDbRepository.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js"
import path from "path";

const repository = new FileDbRepository(path.resolve("db/contacts.json"));
const service = new ContactService(repository);

export async function getAllContacts(req, res) {
    res.status(200);
    res.json(await service.listContacts());
};

export async function getOneContact(req, res) {
    res.status(200);
    const { id } = req.params;
    res.json(await service.getContactById(id));
};

export async function deleteContact(req, res) {
    res.status(200);
    const { id } = req.params;
    res.json(await service.removeContact(id));
};

export async function createContact(req, res) {
    res.status(200);
    res.json(await service.addContact(req.body));
};

export async function updateContact(req, res) {
    res.status(200);
    const { id } = req.params;
    res.json(await service.updateContact(id, req.body));
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
};

