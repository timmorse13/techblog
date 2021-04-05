const router = require('express').Router();
const { User, Submission } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage')
});

router.get('/submission', async (req, res) => {
    try {
        const submissionData = await Submission.findAll();
        const submission = submissionData.map((submission) => submission.get({ plain: true }));
        res.render('dashboard', { submission});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/submission/:id', async (req, res) => {
    try {
        const submissionId = await Submission.findByPk(req.params.id);
        const subId = submissionId.get({ plain: true });
        res.render('dashboard', subId );
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
  });

router.get('/profile', withAuth, async (req, res) => {
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
});

module.exports = router;

