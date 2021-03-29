const router = require('express').Router();
const { checkToken } = require('./middleware');

const visitorsApiRouter = require('./api/visitors');
const usersApiRouter = require('./api/users');
const postsApiRouter = require('./api/posts');
const postMessagesApiRouter = require('./api/postMessages');
const conversationApiRouter = require('./api/conversations');
const conversationMessagesApiRouter = require('./api/conversationMessages');
const favouritesApiRouter = require('./api/favourites');
const likesApiRouter = require('./api/likes');

router.use('/visitors', visitorsApiRouter);
router.use('/users', checkToken, usersApiRouter);
router.use('/posts', checkToken, postsApiRouter);
router.use('/postMessages', checkToken, postMessagesApiRouter);
router.use('/conversations', checkToken, conversationApiRouter);
router.use('/conversationMessages', checkToken, conversationMessagesApiRouter);
router.use('/favourites', checkToken, favouritesApiRouter);
router.use('/likes', checkToken, likesApiRouter);

module.exports = router;