// importations des modules.
const router = require('express').Router();
const authCtrl = require('../controllers/auth.ctrl');

// Route pour s'enregistrer.
router.post('/register', authCtrl.signUp);
// Route pour se log.
router.post('/login', authCtrl.signIn);

// Exportation pour pouvoir y accéder depuis un autre fichier.
module.exports = router;