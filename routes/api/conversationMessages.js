const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/messages/audio' });
const { getMessages, create, createFile } = require('../../models/conversationMessage');
const fs = require('fs');

router.get('/:idconversation', async (req, res) => {
    try {
        const result = await getMessages(req.params.idconversation);
        res.json(result);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const result = await create(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

router.post('/newfile', upload.single('file'), async (req, res) => {
    console.log(req.body);
    const extension = '.' + req.file.originalname.split('.')[1];
    const newName = req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath);
    req.body.text = newName;
    try {
        const result = await createFile(req.body);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;