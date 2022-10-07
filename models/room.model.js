module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
  
      number: {
        type: Sequelize.DATEONLY
      },
      capacity: {
        type: Sequelize.INTEGER
      }
    });
    return Room;
  };