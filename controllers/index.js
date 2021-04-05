const router = require('express').Router();
// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const signup = require('./signup');
const login = require('./login');

router.use('/', homeRoutes)
router.use('/signup', signup);
router.use('/login', login);
router.use('/api', apiRoutes);


module.exports= router;