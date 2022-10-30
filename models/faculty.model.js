module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define("faculty", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
  
      name: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
    });
    return Faculty;
  };