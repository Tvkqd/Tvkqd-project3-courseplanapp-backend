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
db.faculties = require("./faculty.model.js")(sequelize, Sequelize);
db.facultySections = require("./facultySection.model.js")(sequelize, Sequelize);
db.officeHours = require("./officeHour.model.js")(sequelize, Sequelize);
db.rooms = require("./room.model.js")(sequelize, Sequelize);
db.sections = require("./section.model.js")(sequelize, Sequelize);
db.sectionTimes = require("./sectionTime.model.js")(sequelize, Sequelize);
db.semesters = require("./semester.model.js")(sequelize, Sequelize);
db.specialLists = require("./specialList.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

db.courses.hasMany(db.sections, { as: "sections" });
db.sections.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});

db.sections.hasOne(db.sectionTimes, { as: "sectionTimes" });
db.sectionTimes.belongsTo(db.sections, {
  foreignKey: "sectionId",
  as: "section",
});

db.rooms.hasMany(db.sectionTimes, { as: "sectionTimes" });
db.sectionTimes.belongsTo(db.rooms, {
  foreignKey: "roomId",
  as: "room",
});

db.semesters.hasMany(db.sections, { as: "sections" });
db.sections.belongsTo(db.semesters, {
  foreignKey: "semesterId",
  as: "semester",
});

db.sections.belongsToMany(db.faculties, { through: 'facultySections' }); 

db.users.hasOne(db.faculties, { as: "faculties" });
db.faculties.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.officeHours, { as: "officeHours" });
db.officeHours.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasOne(db.specialLists, { as: "specialLists" });
db.specialLists.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;