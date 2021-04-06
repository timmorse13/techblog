const router = require('express').Router();
const { User, Submission } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
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

router.post('/api/submission', async (req, res) => {
    try {
        const submissionData = await Submission.create(req.body);
        res.status(200).json(submissionData);
    } catch (err) {
        res.status(400).json(err)
    }

})

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

