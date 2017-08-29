const environment = process.env.NODE_ENV || 'develop';
let dbConfig = null;

if(environment === 'develop'){
  process.env.PORT = 5000;
  process.env.CLEARDB_DATABASE_URL = 'mysql://root:pinku@localhost:3306/link_bin';
}

else if (environment === 'testing'){
  process.env.PORT = 5000;


  dbConfig = {
    database: 'link_bin_test',
    username: 'root',
    password: 'pinku'
  }
}

console.log('*** Working env : ', environment);

module.exports = {
  dbConfig
}