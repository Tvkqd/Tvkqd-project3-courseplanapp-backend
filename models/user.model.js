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
      fName: {
        type: Sequelize.STRING
      },
      lName: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
    });
    return User;
  };