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
    });
    return SpecialList;
  };