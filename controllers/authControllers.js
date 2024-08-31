import ctrlWrapper from "../middleware/ctrlWrapper.js";
import gravatar from "gravatar";
import { AuthService } from "../services/authServices.js";
import * as fs from "node:fs/promises";
import path from "node:path";

const service = new AuthService();
const avatarPath = path.resolve("public", "avatars");

async function register(req, res) {
    req.body.avatarURL = gravatar.url(req.body.email);

    const user = await service.register(req.body);
    res.status(201).json({
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
}

async function verifyToken(req, res) {
    await service.verifyToken(req.params.verificationToken);
    res.status(201).json({
        message: "Verification successful",
    });
}

async function sendVerifyToken(req, res) {
    await service.sendVerifyToken(req.body.email);
    res.status(200).json({
        message: "Verification email sent",
    });
}

async function updateAvatar(req, res) {
    const fileURl = await getAvatarUrl(req.file);

    const user = await service.updateAvatar(req.user.id, fileURl);
    res.status(200).json({
        user: {
            avatarURL: user.avatarURL,
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

async function getAvatarUrl(file) {
    const { path: oldPath, filename } = file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    return path.join("avatars", filename);
}

export default {
    logIn: ctrlWrapper(logIn),
    register: ctrlWrapper(register),
    logOut: ctrlWrapper(logOut),
    updateSubscription: ctrlWrapper(updateSubscription),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyToken: ctrlWrapper(verifyToken),
    sendVerifyToken: ctrlWrapper(sendVerifyToken),
};
