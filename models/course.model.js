//This is the course table. Changes here make changes to the database.
module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INTEGER, 
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },

    dept: {
      type: Sequelize.STRING,
      allowNull: false
    },
    course_number: {
      type: Sequelize.STRING,
    },
    subject: {
      type: Sequelize.STRING
    },
    courseNum: {
      type: Sequelize.INTEGER
    },
    level: {
      type: Sequelize.STRING,
    },
    hours: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      allowNull : false
    },
    description: {
      type: Sequelize.STRING
    }
  });
  return Course;
};