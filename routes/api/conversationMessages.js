const router = require('express').Router();
const { getMessages, create } = require('../../models/conversationMessage')

router.get('/:idconversation', async (req, res) => {
    try {
        const result = await getMessages(req.params.idconversation);
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

module.exports = router;