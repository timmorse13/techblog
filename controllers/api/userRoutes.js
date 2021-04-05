const router = require('express').Router();
const { User } = require('../../models')

router.get('/', async (req, res) => {
    const userData = await User.findAll()
    res.json(userData) 
})

router.post('/', async (req, res) => {
      console.log(req.body)
      User.create(req.body)

      .then(response => {
        req.session.save(() => {
          req.session.user_id = response.id;
          req.session.logged_in = true;

          console.log(response.id)

        res.status(200).json(response) 
        
      })
        
      }).catch (err => {
      console.log(err)
      res.status(400).json(err);
    });

});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData)
    if (!userData) {
      res.status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router