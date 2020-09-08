const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const config = require('../config');
const router = require('./routes/api/v1');

app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.json({ successed: true });
})



app.listen(config.app.port, () => console.info(`App listening on port ${config.app.port}!`));
