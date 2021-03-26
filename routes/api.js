const router = require('express').Router();
const { checkToken } = require('./middleware')

const visitorsApiRouter = require('./api/visitors')
const usersApiRouter = require('./api/users');
const postsApiRouter = require('./api/posts');
const postMessagesApiRouter = require('./api/postMessages')

router.use('/visitors', visitorsApiRouter);
router.use('/users', checkToken, usersApiRouter);
router.use('/posts', checkToken, postsApiRouter);
router.use('/postMessages', checkToken, postMessagesApiRouter);

module.exports = router;