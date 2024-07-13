import { Sequelize } from "sequelize";
import db from "../config/database";
import Users from "./UserModel";

const { DataTypes } = Sequelize;
const Products = db.define(
  "product",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

Users.hasMany(Products);
Products.belongsTo(Users);

export default Products;
