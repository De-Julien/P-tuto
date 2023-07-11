// importations des modules.
const router = require('express').Router();
const authCtrl = require('../controllers/auth.ctrl');
const jwtSucces = require('../middleware/login.jwt');

// Route pour s'enregistrer.
router.post('/register', authCtrl.signUp);
// Route pour se log.
router.post('/login', authCtrl.signIn);
// Route pour se déconnecter.
router.get('/logout', jwtSucces, authCtrl.logout);


module.exports = router;