// importations des modules.
const router = require('express').Router();
const authCtrl = require('../controllers/auth.ctrl');

router.post('/register', authCtrl.signUp) ;

module.exports = router;