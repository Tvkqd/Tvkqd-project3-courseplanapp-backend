module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("section", {
      /*Change DB TYPES, make Description larger*/
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      number: {
        type: Sequelize.STRING
      }
    });
    return Section;
  };