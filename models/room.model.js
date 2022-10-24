module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
  
      number: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.INTEGER
      }
    });
    return Room;
  };