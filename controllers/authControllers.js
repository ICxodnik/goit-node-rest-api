import ctrlWrapper from "../helpers/ctrlWrapper.js";
import httpError from "../errors/httpError.js";
import { AuthService } from "../services/authServices.js";

// const repository = new OrmDbRepository(db.Contact);
const service = new AuthService();

async function register(req, res) {
    const result = await service.register(req.body);
    res.status(201).json(result);
}

async function logIn(req, res) {}

async function logOut(req, res) {}

async function getCurrentUser(req, res) {}

async function updateToken(req, res) {}

export default {
    logIn: ctrlWrapper(logIn),
    register: ctrlWrapper(register),
    logOut: ctrlWrapper(logOut),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    updateToken: ctrlWrapper(updateToken),
};
