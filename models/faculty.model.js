module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define("faculty", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
  
      fName: {
        type: Sequelize.STRING
      },
      lName: {
        type: Sequelize.STRING
      },
      mName: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
    });
    return Faculty;
  };