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
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      courseNum: {
        type: Sequelize.INTEGER
      },
      sectionNum: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      }
    });
    return Section;
  };