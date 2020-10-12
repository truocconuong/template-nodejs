const sequelize = require('../config/sequelize').sequelize;
const Sequelize = require('sequelize')
const Product = sequelize.define('product', {
  user_id: {
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
  },
});


module.exports = Product;