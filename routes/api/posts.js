const router = require('express').Router();
const { getAll, getById, getByGenre, getByLicense, getByKey, getByBpm } = require('../../models/post');

router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/:idpost', async (req, res) => {
    try {
        const result = await getById(req.params.idpost);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/genre/:genre', async (req, res) => {
    try {
        const result = await getByGenre(req.params.genre);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/license/:license', async (req, res) => {
    try {
        const result = await getByLicense(req.params.license);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/key/:key', async (req, res) => {
    try {
        const result = await getByKey(req.params.key);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/bpm/:bpm', async (req, res) => {
    try {
        const result = await getByBpm(req.params.bpm);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;