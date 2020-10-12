const sequelize = require('../config/sequelize').sequelize;
const Sequelize = require('sequelize');
const Product = require('./Products');
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});



User.hasMany(Product, {
  foreignKey: 'user_id'
})


User.addScope('name', {
  include: [
    { model: Product }
  ]
})

module.exports = User;