module.exports = (sequelize, Sequelize) => {
    const SectionTime = sequelize.define("sectionTime", {
      /*Change DB TYPES, make Description larger*/
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
  
      startDate: {
        type: Sequelize.DATEONLY
      },
      endDate: {
        type: Sequelize.DATEONLY
      },
      startTime: {
        type: Sequelize.TIME
      },
      endTime: {
        type: Sequelize.TIME
      },
      dayWeek: {
        type: Sequelize.STRING
      }
    });
    return SectionTime;
  };