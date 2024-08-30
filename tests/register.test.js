import { app, closeApp } from "../app.js";
import { User } from "../db/index.js";
import request from "supertest";

describe("test /register route", () => {
    afterEach(async () => {
        await User.destroy({
            where: { email: "gggggg2@gmail.com" },
        });
    });

    afterAll(async () => {
        closeApp();
    });

    test("/register with correct data", async () => {
        const loginData = {
            email: "gggggg2@gmail.com",
            password: "gggggg",
        };

        const { status, body } = await request(app).post("/api/auth/register").send(loginData);

        expect(status).toBe(201);
        expect(body.user.email).toBe(loginData.email);

        const user = await User.findOne({
            where: {
                email: loginData.email,
            },
        });

        expect(user).toBeTruthy();
    });

    test("/register with incorrect data", async () => {
        const loginData = {
            email: "gggggg2@gmail.com",
        };

        const { status } = await request(app).post("/api/auth/register").send(loginData);

        expect(status).toBe(400);
    });

    test("/register duplicate", async () => {
        const loginData = {
            email: "gggggg2@gmail.com",
            password: "gggggg",
        };

        const req1 = await request(app).post("/api/auth/register").send(loginData);
        const req2 = await request(app).post("/api/auth/register").send(loginData);

        expect(req1.status).toBe(201);
        expect(req2.status).toBe(409);
        expect(req1.body.user.email).toBe(loginData.email);

        const users = await User.findAll({
            where: {
                email: loginData.email,
            },
        });

        expect(users).toHaveLength(1);
    });
});
