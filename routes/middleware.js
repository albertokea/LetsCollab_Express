const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.json({ error: 'You must include headers authorization' })
    }
    const token = req.headers['authorization'];
    let data;
    try {
        data = jwt.verify(token, 'collabers salt');
    } catch (error) {
        return res.json({ error: 'Incorrect token' })
    }
    if (dayjs().unix() > data.expire) {
        return res.json({ error: 'Expired token' })
    }
    req.userId = data.userId
    next();
}

module.exports = {
    checkToken
}