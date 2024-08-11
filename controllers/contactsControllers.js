import { ContactService } from "../services/contactsServices.js";
import { FileDbRepository } from "../repositories/fileDbRepository.js";
import path from "path";

const repository = new FileDbRepository(path.resolve("db/contacts.json"));
const service = new ContactService(repository);

export const getAllContacts = async (req, res) => {
    res.status(200);
    res.json(await service.listContacts());
};

export const getOneContact = async (req, res) => {
    res.status(200);
    const { id } = req.params;
    res.json(await service.getContactById(id));
};

export const deleteContact = async (req, res) => {
    res.status(200);
    const { id } = req.params;
    res.json(await service.removeContact(id));
};

export const createContact = async (req, res) => {
    res.status(200);
    res.json(await service.addContact(req.body));
};

export const updateContact = async (req, res) => {
    res.status(200);
    const { id } = req.params;
    res.json(await service.updateContact(id, req.body));
};

