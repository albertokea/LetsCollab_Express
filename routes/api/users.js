const router = require('express').Router();
const multer = require('multer');
const uploadProfileImage = multer({ dest: 'public/images/profile_pictures' });
const uploadHeader = multer({ dest: 'public/images/header_pictures' });
const { getAll, getById, getByEmail, getByUser, create, updateProfile, deleteById, updateHeader } = require('../../models/user');
const fs = require('fs')

//Edit
router.put('/update', uploadProfileImage.single('profile_picture'), async (req, res, next) => {
    if (req.file) {
        const extension = '.' + req.file.mimetype.split('/')[1];
        const newName = req.file.filename + extension;
        const newPath = req.file.path + extension;
        fs.renameSync(req.file.path, newPath);
        req.body.profile_picture = newName

        try {
            const result = await updateProfile(req.body);
            res.json(result)
        }
        catch (error) {
            res.status(422).json({ error: error.message });
        }
    } else {

        try {
            const result = await updateProfile(req.body);
            res.json(result)
        }
        catch (error) {
            res.status(422).json({ error: error.message });
        }
    }


});
router.put('/updateHeader', uploadHeader.single('header_picture'), async (req, res, next) => {

    const extension = '.' + req.file.mimetype.split('/')[1];
    const newName = req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath);
    req.body.header_picture = newName
    req.body.iduser = req.userId


    try {
        console.log(req.body);
        const result = await updateHeader(req.body);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });

    }


});
//GET all users
router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

//GET by Id
router.get('/:idUser', async (req, res) => {
    try {
        const result = await getById(req.params.idUser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

//GET by email
router.get('/email/:email', async (req, res) => {
    try {
        const result = await getByEmail(req.params.email);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})

//GET by user
router.get('/user/:user', async (req, res) => {
    try {
        const result = await getByUser(req.params.user);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})

router.delete('/delete/:iduser', async (req, res) => {
    try {
        const result = await deleteById(req.params.iduser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})

module.exports = router;