const router = require('express').Router();
const { getAll, getById, getByEmail, getByUser, create } = require('../../models/user');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

//GET all users
router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

//GET by Id
router.get('/:idUser', async (req, res) => {
    try {
        const result = await getById(req.params.idUser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

//GET by email
router.get('/email/:email', async (req, res) => {
    try {
        const result = await getByEmail(req.params.email);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})

//GET by user
router.get('/user/:user', async (req, res) => {
    try {
        const result = await getByUser(req.params.user);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})

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
                res.json({ error: 'El email o contraseña introducidos son incorrectos' })
            }
        } else {
            res.json({ error: 'El email o contraseña introducidos son incorrectos' })
        }
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }

});

function createToken(user) {
    const data = {
        userId: user.id,
        expire: dayjs().add(15, 'minutes').unix()
    }
    return jwt.sign(data, 'collabers salt')
}

module.exports = router;