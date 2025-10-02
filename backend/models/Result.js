// backend/models/Result.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Quiz = require("./Quiz");

const Result = sequelize.define("Result", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  score: { type: DataTypes.INTEGER, allowNull: false }
});

// Link to student + quiz
Result.belongsTo(User, { foreignKey: "studentId", as: "student" });
Result.belongsTo(Quiz, { foreignKey: "quizId", as: "quiz" });

User.hasMany(Result, { foreignKey: "studentId", as: "results" });
Quiz.hasMany(Result, { foreignKey: "quizId", as: "results" });

module.exports = Result;
