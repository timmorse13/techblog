const router = require('express').Router();
const { User, Submission } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage')
});

router.get('/submission/:id', async (req, res) => {
    try {
        const submissionId = await Submission.findByPk(req.params.id);
        const subId = submissionId.get({ plain: true });
        // res.render('', subId)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/profile', async (req, res) => {
    try {
        const profileData = await User.findByPk(req.session.user_id, {
            include: [{ model: Submission }]
        });
        const profile = profileData.get({ plain: true });
        res.render('profile', profile);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})