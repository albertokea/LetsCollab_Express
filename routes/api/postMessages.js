const router = require('express').Router();
const { getByPost, getByUserId, create, deleteById } = require('../../models/postMessage');

router.get('/post/:post', async (req, res) => {
    try {
        const result = await getByPost(req.params.post);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/user/:userid', async (req, res) => {
    try {
        const result = await getByUserId(req.params.userid);
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

router.delete('/delete/:idmessage', async (req, res) => {
    try {
        const result = await deleteById(req.params.idmessage);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})



module.exports = router;