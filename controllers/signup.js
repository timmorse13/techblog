const router = require('express').Router();
const { User } = require('../models')

router.get('/signup', async (req, res) => {
    res.render('signup')
})

router.get('/user', async (req, res) => {
    try {
        const userData = await User.findAll();
        const user = userData.map((users) => users.get({ plain: true }));
        // res.render('users', { user });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;