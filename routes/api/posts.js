const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/audio' });
const { getAll, getCount, getCountUserPosts, getCountByGenre, getCountByLicense, getCountByKey, getCountByBpm, getCountByType, getCountByKeyword, getById, getByGenre, getByLicense, getByKey, getByBpm, getByType, getByUserId, getByKeyword, create, updateById, deleteById } = require('../../models/post');
const fs = require('fs');

router.get('/offset/:offset', async (req, res) => {
    try {
        const data = {};
        const result = await getAll(parseInt(req.params.offset));
        const count = await getCount();
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
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

router.get('/genre/:genre/offset/:offset', async (req, res) => {
    console.log('hola');
    try {
        console.log(req.params.genre);
        console.log(req.params.offset);
        const data = {};
        const result = await getByGenre(req.params.genre, parseInt(req.params.offset));
        const count = await getCountByGenre(req.params.genre);
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/license/:license/offset/:offset', async (req, res) => {
    try {
        const data = {};
        const result = await getByLicense(req.params.license, parseInt(req.params.offset));
        const count = await getCountByLicense(req.params.license);
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/key/:key/offset/:offset', async (req, res) => {
    try {
        const data = {};
        const result = await getByKey(req.params.key, parseInt(req.params.offset));
        const count = await getCountByKey(req.params.key);
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/bpm/:bpm/offset/:offset', async (req, res) => {
    try {
        const data = {};
        const result = await getByBpm(req.params.bpm, parseInt(req.params.offset));
        const count = await getCountByBpm(req.params.bpm);
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/type/:type/offset/:offset', async (req, res) => {
    try {
        const data = {};
        const result = await getByType(req.params.type, parseInt(req.params.offset));
        const count = await getCountByType(req.params.type);
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/user/:fk_user/offset/:offset', async (req, res) => {
    try {
        const data = {};
        const result = await getByUserId(parseInt(req.params.fk_user), parseInt(req.params.offset));
        const count = await getCountUserPosts(req.params.fk_user);
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/keyword/:keyword/offset/:offset', async (req, res) => {
    try {
        const data = {};
        const result = await getByKeyword(req.params.keyword, parseInt(req.params.offset));
        const count = await getCountByKeyword(req.params.keyword);
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
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
    req.body.fk_user = req.userId;
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