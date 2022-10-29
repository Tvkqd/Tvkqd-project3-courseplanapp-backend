module.exports = {
    HOST: 'localhost',
    port: 3306,
    USER: 't12022',
    PASSWORD: 'cs@oc2022t1',
    DB: 'p3-schedule-t1', //updated, verofy this
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};