// backend/models/Quiz.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./Course");

const Quiz = sequelize.define("Quiz", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  question: { type: DataTypes.STRING, allowNull: false },
  options: { type: DataTypes.JSON, allowNull: false }, // array of choices
  answer: { type: DataTypes.STRING, allowNull: false } // correct choice
});

// Each quiz belongs to a course
Quiz.belongsTo(Course, { foreignKey: "courseId", as: "course" });
Course.hasMany(Quiz, { foreignKey: "courseId", as: "quizzes" });

module.exports = Quiz;
