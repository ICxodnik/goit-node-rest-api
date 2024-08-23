import { Sequelize } from "sequelize";
import config from "./config.js";
import contact from "./models/contacts.js";

export const db = new Sequelize({
    dialect: config.dialect,
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    dialectOptions: {
        ssl: true,
    },
});

export const Contact = db.define(...contact);
//Contact.sync({ force: true });
