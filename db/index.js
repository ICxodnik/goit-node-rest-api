import { Sequelize } from "sequelize";

import config from "./config.js";

const sequelize = new Sequelize({
    dialect: config.dialect,
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    dialectOptions: {
        ssl: true,
    },
});

export default sequelize;
