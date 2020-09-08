const { Sequelize } = require('sequelize');
const config = require('../../config')
function initDB() {
    const sequelize = new Sequelize(config.database.scheme, config.database.username, config.database.password, {
        host: config.database.localhost,
        dialect: config.database.dialect,
    });
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    return sequelize
}

module.exports = {
    initDB
}