const config = require('../config/config');
const {dbConfig} = require('../config/config');
const Sequelize = require('sequelize');
// import Sequelize from 'sequelize';


if(dbConfig === null) {
  console.log('dbConfig is null');
  process.exit(-1);
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = sequelize;