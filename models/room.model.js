module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      number: {
        type: Sequelize.STRING
      },
      bldg: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Room;
  };