module.exports = (sequelize, Sequelize) => {
    const Semester = sequelize.define("semester", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      endDate: {
        type: Sequelize.DATEONLY
      }
    },
    {
      timestamps: false,
    });
    return Semester;
  };