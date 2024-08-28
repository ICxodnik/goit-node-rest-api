import { DataTypes } from "sequelize";

export default [
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter",
        },
        token: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
    },
    {
        underscored: true,
    },
];
