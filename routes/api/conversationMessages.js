const router = require('express').Router();
const { getMessages } = require('../../models/conversationMessage')

router.get('/:idconversation/user/:iduser', async (req, res) => {
    try {
        const result = await getMessages(req.params.idconversation, req.params.iduser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;