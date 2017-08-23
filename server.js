const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const v1Routes = require('./routes/v1'); 
const port = process.env.PORT;

const app = express();

app.use('/api/v1', v1Routes);

app.listen(port, () => {
  console.log('server is running on port no. :'+ port);
});