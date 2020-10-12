require('dotenv').config()
const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./routes/api/v1');
const { strategy } = require('./app/passport');
const passport = require('passport');
const User = require('./models/users');
const { UserRepository } = require('./app/Repositories/UserRepository');
const Product = require('./models/Products');




passport.use(strategy);

const app = express();
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.json({ successed: true });
})







app.listen(process.env.PORT, () => console.info(`App listening on port ${process.env.PORT}!`));




app.get('/checker', async (req, res) => {
  const repository = new UserRepository();
  repository.searchQueryParams(req.query);
  const result = await repository.get();
  res.json(result)
})


const userRepository = new UserRepository();


module.exports = app
