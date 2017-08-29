const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors  =require('cors');

const port = process.env.PORT;
const v1Routes = require('./routes/v1'); 


const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// route middleware
app.use('/api/v1', v1Routes);

app.listen(port, () => {
  console.log('server is running on port no. :'+ port);
});