module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
  
      email: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      }
    });
    return User;
  };