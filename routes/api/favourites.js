const router = require('express').Router();
const { getByUser, getCountByUser, getCountByPost } = require('../../models/favourite')

router.get('/:iduser/offset/:offset', async (req, res) => {
    try {
        const data = {};
        const result = await getByUser(req.params.iduser, parseInt(req.params.offset));
        const count = await getCountByUser(req.params.iduser);
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) };
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(422).json({ error: error.message });
    }
});

router.get('/count/:idpost', async (req, res) => {
    try {
        const count = await getCountByPost(req.params.idpost);
        res.json(count);
    }
    catch (error) {
        console.log(error);
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;
