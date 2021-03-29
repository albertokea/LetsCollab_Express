const router = require('express').Router();
const { getByConversation, getByUserId, getByUsersIds } = require('../../models/conversation');

router.get('/:idconversation', async (req, res) => {
    try {
        const result = await getByConversation(req.params.idconversation);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/user/:iduser', async (req, res) => {
    try {
        const result = await getByUserId(req.params.iduser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.get('/users/:iduser1/user2/:iduser2', async (req, res) => {
    try {
        const result = await getByUsersIds(req.params.iduser1, req.params.iduser2);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;