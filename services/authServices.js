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
        const newUser = {
            ...data,
            password: hashPassword,
        };
        const result = await db.User.create(newUser);
        return result;
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
        if (!this.isValidPassword(user.password, data.password)) {
            throw new AppError(errorTypes.INVALID_CRED, "Email or password is wrong");
        }

        // write token data
        user.token = jwt.sign({ id: user.id }, this.secret, { expiresIn: "24h" });
        await user.save();

        return {
            user: {
                email: user.email,
                subscription: user.subscription,
            },
            token: user.token,
        };
    }

    async logOut(data) {
        const user = getCurrentUser(data);
        user.token = null;
        user.save();
    }

    async getCurrentUser(data) {
        //get token data

        const { id } = jwt.verify(data.token, this.secret);
        const user = await db.User.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new AppError(errorTypes.INVALID_TOKEN, "Not authorized");
        }
        return user;
    }

    async updateSubscription(data) {
        const user = getCurrentUser(data);

        user.subscription = data.subscription;
        user.save();
        return user;
    }

    async isValidPassword(password, checkingPassword) {
        const hashPassword = await bcrypt.hash(checkingPassword, this.secret_quality);

        return await bcrypt.compare(hashPassword, password);
    }
}
