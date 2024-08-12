import { ContactService } from "../services/contactsServices.js";
import { FileDbRepository } from "../repositories/fileDbRepository.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import path from "path";

const repository = new FileDbRepository(path.resolve("db/contacts.json"));
const service = new ContactService(repository);

async function getAllContacts(req, res) {
    res.json(await service.listContacts());
};

async function getOneContact(req, res) {
    const { id } = req.params;
    const result = await service.getContactById(id);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

async function deleteContact(req, res) {
    const { id } = req.params;
    const result = await service.removeContact(id);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
    res.status(204);
};

async function createContact(req, res) {
    res.json(await service.addContact(req.body));
    res.status(201);
};

async function updateContact(req, res) {
    const { id } = req.params;
    const result = await service.updateContact(id, req.body);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
};

