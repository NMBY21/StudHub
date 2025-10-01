const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("studyhub_db", "root", "betty", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
