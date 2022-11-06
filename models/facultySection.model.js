module.exports = (sequelize, Sequelize) => {
    const FacultySection = sequelize.define("facultySection", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      }
    },
    {
      timestamps: false,
    });
    return FacultySection;
  };