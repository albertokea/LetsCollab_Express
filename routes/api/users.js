const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images/profile_pictures' });
const { getAll, getById, getByEmail, getByUser, create, updateProfile, deleteById } = require('../../models/user');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const fs = require('fs')

//Edit
router.put('/update', upload.single('profile_picture'), async (req, res, next) => {
    console.log(req.file.path);
    try {
        /*  const idk = fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]); */
        /* const result = await updateProfile(req.body);
        res.json(result) */
        /* console.log(idk); */

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