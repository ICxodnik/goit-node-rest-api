import ctrlWrapper from "../middleware/ctrlWrapper.js";
import { AuthService } from "../services/authServices.js";

const service = new AuthService();

async function register(req, res) {
    const user = await service.register(req.body);
    res.status(201).json({
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
}

async function logIn(req, res) {
    const user = await service.logIn(req.body);
    res.json({
        user: {
            email: user.email,
            subscription: user.subscription,
        },
        token: user.token,
    });
}

async function logOut(req, res) {
    await service.logOut(req.user.id);
    res.status(204).end();
}

async function getCurrentUser(req, res) {
    const user = await service.getCurrentUser(req.user.id);
    res.json({
        email: user.email,
        subscription: user.subscription,
    });
}

async function updateSubscription(req, res) {
    const user = await service.updateSubscription(req.user.id, req.body);
    res.json({
        email: user.email,
        subscription: user.subscription,
    });
}

export default {
    logIn: ctrlWrapper(logIn),
    register: ctrlWrapper(register),
    logOut: ctrlWrapper(logOut),
    updateSubscription: ctrlWrapper(updateSubscription),
    getCurrentUser: ctrlWrapper(getCurrentUser),
};
