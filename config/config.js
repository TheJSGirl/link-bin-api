const environment = process.env.NODE_ENV || 'develop';
let dbConfig = null;

if(environment === 'develop'){
  process.env.PORT = 5000;


  dbConfig = {
    database: 'link_bin',
    username: 'root',
    password: 'pinku'
  }

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