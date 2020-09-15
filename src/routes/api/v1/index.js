const adminRouter = require('./admin');
const auth = require('./auth');
const router = require('express').Router();

router.use('/admin', adminRouter)
router.use('/auth', auth)

module.exports = router;