import { AppError, errorTypes } from "../errors/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as db from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
import * as mailService from "./emailServices.js";

export class AuthService {
    secret = process.env.JWT_SECRET;
    secret_quality = 5;

    async register(data) {
        // optional as email unique in bd
        const user = await db.User.findOne({
            where: {
                email: data.email,
            },
        });
        if (user) {
            throw new AppError(errorTypes.ALREADY_EXIST, "Email in use");
        }

        const hashPassword = await bcrypt.hash(data.password, this.secret_quality);
        const newUser = await db.User.create({
            ...data,
            password: hashPassword,
            verificationToken: uuidv4(),
        });

        await mailService.sendVerifyEmail(newUser.email, newUser.verificationToken);
        return newUser;
    }

    async verifyToken(token) {
        const user = await db.User.findOne({
            where: {
                verificationToken: token,
            },
        });
        if (!user) {
            throw new AppError(errorTypes.NOT_FOUND, "User not found");
        }

        //Не вказано в тз, що якщо користувач вже верифікований щоб відправляти помилку
        user.verificationToken = null;
        user.verify = true;
        await user.save();
    }

    async sendVerifyToken(email) {
        const user = await db.User.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new AppError(errorTypes.INVALID_CRED, "Email or password is wrong");
        }
        if (user.verificationToken === null || user.verify === true) {
            throw new AppError(errorTypes.ALREADY_VERIFIED, "Verification has already been passed");
        }
        await mailService.sendVerifyEmail(user.email, user.verificationToken);
    }

    async logIn(data) {
        const user = await db.User.findOne({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            throw new AppError(errorTypes.INVALID_CRED, "Email or password is wrong");
        }
        if (user.verificationToken || user.verify === false) {
            throw new AppError(errorTypes.INVALID_CRED, "Email is not verified");
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new AppError(errorTypes.INVALID_CRED, "Email or password is wrong");
        }

        // write token data
        user.token = jwt.sign({ id: user.id }, this.secret, { expiresIn: "24h" });
        return await user.save();
    }

    async logOut(id) {
        const user = await this.getCurrentUser(id);
        user.token = null;
        return await user.save();
    }

    async getCurrentUser(userId) {
        const user = await db.User.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new AppError(errorTypes.INVALID_TOKEN, "Not authorized");
        }
        return user;
    }

    async updateSubscription(userId, data) {
        const user = await this.getCurrentUser(userId);

        user.subscription = data.subscription;
        return await user.save();
    }

    async updateAvatar(userId, imageUrl) {
        const user = await this.getCurrentUser(userId);

        user.avatarURL = imageUrl;
        return await user.save();
    }
}
