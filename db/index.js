import { Sequelize } from "sequelize";
import config from "./config.js";
import contact from "./models/contacts.js";
import user from "./models/users.js";

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

export const User = db.define(...user);
export const Contact = db.define(...contact);

User.hasMany(Contact, {
    foreignKey: {
        name: "ownerId",
    },
});
Contact.belongsTo(User);

db.sync({ force: true });
