const  sequelize = require('../db/db');
const Sequelize = require('sequelize');

const Bookmark = sequelize.define('bookmarks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },

  link: {
    type: Sequelize.STRING(250),
    unique: true,
    allowNull: false

  },

  created_at: {
    type: Sequelize.STRING(50),
    defaultValue: Sequelize.NOW
  }

});

module.exports = Bookmark;