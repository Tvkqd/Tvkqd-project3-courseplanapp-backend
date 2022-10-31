module.exports = (sequelize, Sequelize) => {
    const OfficeHour = sequelize.define("officeHour", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        unique : true
      },
  
      dayWeek: {
        type: Sequelize.STRING
      },
      startTime: {
        type: Sequelize.STRING
      },
      endTime: {
        type: Sequelize.STRING
      }
    });
    return OfficeHour;
  };