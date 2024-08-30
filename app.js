import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import { db } from "./db/index.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
    console.warn(err);
});

app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
});

db.authenticate()
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((error) => {
        console.error("Unable to connect to the database", error);

        process.exit(1);
    });
