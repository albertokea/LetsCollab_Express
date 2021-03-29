const router = require('express').Router();
const { getLike, getByUser, create, deleteById } = require('../../models/like');

router.get('/:idpost/user/:iduser', async (req, res) => {
    try {
        const result = await getLike(req.params.idpost, req.params.iduser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/user/:iduser', async (req, res) => {
    try {
        const result = await getByUser(req.params.iduser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const result = await create(req.body);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.delete('/delete/:idlike', async (req, res) => {
    try {
        const result = await deleteById(req.params.idlike);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});


module.exports = router;