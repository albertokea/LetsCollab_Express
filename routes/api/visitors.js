const router = require('express').Router();
const { getByUser, create } = require('../../models/visitor');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await create(req.body);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await getByUser(req.body.user);
        if (user) {
            const equal = bcrypt.compareSync(req.body.password, user.password);
            if (equal) {
                res.json({
                    success: 'Login success!!',
                    token: createToken(user)
                });
            } else {
                res.json({ error: 'Incorrect email or password' })
            }
        } else {
            res.json({ error: 'Incorrect email or password' })
        }
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }

});

function createToken(user) {
    const data = {
        userId: user.id,
        expire: dayjs().add(300, 'minutes').unix()
    }
    return jwt.sign(data, 'collabers salt')
}

module.exports = router;