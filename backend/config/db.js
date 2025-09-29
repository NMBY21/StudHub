const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("studyhub_db", "root", "your_password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
