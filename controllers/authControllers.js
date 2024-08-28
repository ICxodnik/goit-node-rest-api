import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { AuthService } from "../services/authServices.js";

const service = new AuthService();

async function register(req, res) {
    const result = await service.register(req.body);
    res.status(201).json(result);
}

async function logIn(req, res) {
    const result = await service.logIn(req.body);
    res.json(result);
}

async function logOut(req, res) {
    await service.logIn(req.body);
    res.status(204);
}

async function getCurrentUser(req, res) {
    const result = await service.getCurrentUser(req.body);
    res.json(result);
}

async function updateSubscription(req, res) {
    const result = await service.updateSubscription(req.body);
    res.json(result);
}

export default {
    logIn: ctrlWrapper(logIn),
    register: ctrlWrapper(register),
    logOut: ctrlWrapper(logOut),
    updateSubscription: ctrlWrapper(updateSubscription),
    getCurrentUser: ctrlWrapper(getCurrentUser),
};
