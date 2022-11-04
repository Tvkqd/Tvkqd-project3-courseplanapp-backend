module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define("faculty", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
  
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Faculty;
  };