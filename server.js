const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = process.env.PORT;
const v1Routes = require('./routes/v1'); 


const app = express();

// middlewares

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// route middleware
app.use('/api/v1', v1Routes);

app.listen(port, () => {
  console.log('server is running on port no. :'+ port);
});