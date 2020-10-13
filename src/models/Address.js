const sequelize = require('../config/sequelize').sequelize;
const Sequelize = require('sequelize')
const Address = sequelize.define('address', {
  user_id: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
  },
},{
  tableName : 'address'
});


module.exports = Address;