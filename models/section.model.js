module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("section", {
      /*Change DB TYPES, make Description larger*/
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        unqiue: true
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Section;
  };