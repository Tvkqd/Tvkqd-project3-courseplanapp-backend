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
db.courses = require("./course.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.facultySection = require("./facultySection.model.js")(sequelize, Sequelize);
db.officeHour = require("./officeHour.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.section = require("./section.model.js")(sequelize, Sequelize);
db.sectionTime = require("./sectionTime.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.specialList = require("./specialList.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

db.courses.hasMany(db.section, { as: "section" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.section.belongsTo(db.courses, { as: "course"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.sectionTime.belongsTo(db.section, { as: "section"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.room.hasMany(db.sectionTime, { as: "sectionTime" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.sectionTime.belongsTo(db.room, { as: "room"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.semester.hasMany(db.section, { as: "section" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.section.belongsTo(db.semester, { as: "semester"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.faculty.hasMany(db.facultySection, { as: "facultySection" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.facultySection.belongsTo(db.faculty, { as: "faculty"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.section.hasMany(db.facultySection, { as: "facultySection" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.facultySection.belongsTo(db.section, { as: "section"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//db.faculty.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.faculty.hasMany(db.user, { as: "user" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.user.belongsTo(db.faculty, { as: "faculty"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.hasMany(db.officeHour, { as: "officeHour" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.officeHour.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//db.specialList.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.hasMany(db.specialList, { as: "specialList" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.specialList.belongsTo(db.user, { as: "user"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.courses.hasMany(db.specialList, { as: "specialList" }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.specialList.belongsTo(db.courses, { as: "course"}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = db;
