// importations des modules.
const router = require('express').Router();
const authCtrl = require('../controllers/auth.ctrl');

// Route pour s'enregistrer.
router.post('/register', authCtrl.signUp);
// Route pour se log.
router.post('/login', authCtrl.signIn);


module.exports = router;