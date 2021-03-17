const router = require('express').Router();

const usersApiRouter = require('./api/users');

router.use('/users', usersApiRouter);

module.exports = router;