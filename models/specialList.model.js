module.exports = (sequelize, Sequelize) => {
    const SpecialList = sequelize.define("specialList", {
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
    });
    return SpecialList;
  };