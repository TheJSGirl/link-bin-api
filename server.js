const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors  =require('cors');
const path = require('path');

const port = process.env.PORT;
const v1Routes = require('./routes/v1'); 

const staticFilePath = path.join(__dirname, './public' );


const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//serving static file
app.use(express.static(staticFilePath));

// route middleware
app.use('/api/v1', v1Routes);

app.get('/', (req, res) => {
  return res.sendFile(staticFilePath)
})

app.listen(port, () => {
  console.log('server is running on port no. :'+ port);
});