module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("section", {
      /*Change DB TYPES, make Description larger*/
      id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
      },
      number: {
        type: Sequelize.INTEGER
      },
      sectionNum: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
    });
    return Section;
  };