require('dotenv').config()
const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const router = require('./routes/api/v1');
const { initDB } = require('./common/DatabaseConnect');

initDB();

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.json({ successed: true });
})


app.listen(9999, () => console.info(`App listening on port ${9999}!`));


