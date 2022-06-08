import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/MySQLConfig";

class User extends Model { }
User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "user",
    },
);

export default User;
