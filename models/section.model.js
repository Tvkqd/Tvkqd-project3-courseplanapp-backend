module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("section", {
      /*Change DB TYPES, make Description larger*/
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      }
    });
    return Section;
  };