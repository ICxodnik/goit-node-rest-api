import { DataTypes } from "sequelize";

import sequelize from "../index.js";

export const Contact = sequelize.define(
    "Contact",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        underscored: true,
    }
);

//Contact.sync({ force: true });
