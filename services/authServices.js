import { AppError, errorTypes } from "../errors/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as db from "../db/index.js";

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
        });
        return newUser;
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
        const isValidPassword = await this.isValidPassword(user.password, data.password);
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

    async isValidPassword(password, checkingPassword) {
        const hashPassword = await bcrypt.hash(checkingPassword, this.secret_quality);

        return await bcrypt.compare(hashPassword, password);
    }
}
