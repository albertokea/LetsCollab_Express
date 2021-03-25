const router = require('express').Router();
const { checkToken } = require('./middleware')

const visitorsApiRouter = require('./api/visitors')
const usersApiRouter = require('./api/users');
const postsApiRouter = require('./api/posts');

router.use('/visitors', visitorsApiRouter);
router.use('/users', checkToken, usersApiRouter);
router.use('/posts', checkToken, postsApiRouter);

module.exports = router;