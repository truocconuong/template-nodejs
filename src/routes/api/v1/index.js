const adminRouter = require('./admin');

const router = require('express').Router();

router.use('/admin',adminRouter)


module.exports = router;