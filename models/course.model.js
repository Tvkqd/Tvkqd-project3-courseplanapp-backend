module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INTEGER, 
      autoIncrement: true,
      primaryKey: true
    },

    dept: {
      type: Sequelize.STRING
    },
    course_number: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.STRING
    },
    hours: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
  });
  return Course;
};