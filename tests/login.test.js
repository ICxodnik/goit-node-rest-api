import { app, closeApp } from "../app.js";
import { User } from "../db/index.js";
import request from "supertest";

describe("test /login route", () => {
    beforeAll(async () => {
        await request(app).post("/api/auth/register").send({
            email: "gggggg1@gmail.com",
            password: "gggggg",
        });
    });

    afterAll(async () => {
        await User.destroy({
            where: { email: "gggggg1@gmail.com" },
        });
        closeApp();
    });

    test("/login with correct data", async () => {
        const loginData = {
            email: "gggggg1@gmail.com",
            password: "gggggg",
        };

        const { status, body } = await request(app).post("/api/auth/login").send(loginData);

        expect(status).toBe(200);
        expect(body.user.email).toBe(loginData.email);
        expect(body.token).toBeDefined();

        const user = await User.findOne({
            where: {
                email: loginData.email,
            },
        });

        expect(user).toBeTruthy();
    });

    test("/login with incorrect creds", async () => {
        const loginData = {
            email: "user@gmail.com",
            password: "123456",
        };

        const { status } = await request(app).post("/api/auth/login").send(loginData);

        expect(status).toBe(401);
    });

    test("/login with incorrect password", async () => {
        const loginData = {
            email: "gggggg1@gmail.com",
            password: "123456",
        };

        const { status } = await request(app).post("/api/auth/login").send(loginData);

        expect(status).toBe(401);
    });
});
