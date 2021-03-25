const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/audio' });
const { getAll, getById, getByGenre, getByLicense, getByKey, getByBpm, getByType, getByUserId, create, updateById, deleteById } = require('../../models/post');
const fs = require('fs');

router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        console.log(result);
        res.json(result)
    }
    catch (error) {
        console.log(error);
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

router.get('/type/:type', async (req, res) => {
    try {
        const result = await getByType(req.params.type);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/user/:fk_user', async (req, res) => {
    try {
        const result = await getByUserId(req.params.fk_user);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.post('/new', upload.single('audio'), async (req, res) => {
    const extension = '.' + req.file.originalname.split('.')[1];
    const newName = req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath);
    req.body.audio = newName;
    try {
        const result = await create(req.body);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})

router.post('/update/', async (req, res) => {
    try {
        const result = await updateById(req.body);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})

router.delete('/delete/:idpost', async (req, res) => {
    try {
        const result = await deleteById(req.params.idpost);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})



module.exports = router;