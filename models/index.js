const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.course = require("./course.model.js")(sequelize, Sequelize);
db.user = require("./faculty.model.js")(sequelize, Sequelize);
db.facultySection = require("./facultySection.model.js")(sequelize, Sequelize);
db.user = require("./officeHour.model.js")(sequelize, Sequelize);
db.user = require("./room.model.js")(sequelize, Sequelize);
db.user = require("./section.model.js")(sequelize, Sequelize);
db.sectionTime = require("./sectionTime.model.js")(sequelize, Sequelize);
db.user = require("./semester.model.js")(sequelize, Sequelize);
db.user = require("./specialList.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

db.course.hasMany(db.user, { as: "user" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.user.belongsTo(db.course, { as: "course"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.sectionTime.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.hasMany(db.sectionTime, { as: "sectionTime" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.sectionTime.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.hasMany(db.user, { as: "user" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.user.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.hasMany(db.facultySection, { as: "facultySection" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.facultySection.belongsTo(db.user, { as: "faculty"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.hasMany(db.facultySection, { as: "facultySection" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.facultySection.belongsTo(db.user, { as: "section"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.hasMany(db.user, { as: "officeHour" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.user.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = db;