// backend/models/Course.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Course = sequelize.define("Course", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false }
});

// Teacher owns courses
Course.belongsTo(User, { foreignKey: "teacherId", as: "teacher" });
User.hasMany(Course, { foreignKey: "teacherId", as: "courses" });

module.exports = Course;
