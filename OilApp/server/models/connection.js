const { Sequelize } = require('sequelize');
const config = require('../db');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
    
});

sequelize.authenticate().then(() => {
    console.log('Connection established');
}).catch((err) => {
    console.log(err);
});

module.exports = sequelize;