module.exports = (sequelize, Sequelize) => {
    const SectionTime = sequelize.define("sectionTime", {
      /*Change DB TYPES, make Description larger*/
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
  
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      startTime: {
        type: Sequelize.TIME
      },
      endTime: {
        type: Sequelize.TIME
      },
      dayWeek: {
        type: Sequelize.STRING
      },
      numWeek: {
        type: Sequelize.INTEGER
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      instrMethod: {
        type: Sequelize.STRING
      }
    });
    return SectionTime;
  };