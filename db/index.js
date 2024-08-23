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

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((error) => {
        console.error("Unable to connect to the database", error);

        process.exit(1);
    });

export default sequelize;
