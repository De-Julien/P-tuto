// importations des modules.
const router = require('express').Router();
const publishCtrl = require('../controllers/publish.Post.ctrl');
const log = require('../middleware/login.jwt');

// les routes possibles à utiliser
//router.get("/", log, publishCtrl.getAllPublish);
//router.get("/like", log, publishCtrl.getAllLikes);

router.post('/', log, publishCtrl.postPublish);
//router.post('/:id/like', log, publishCtrl.likePublish);


//router.put('/:id', log, multer, publishCtrl.updatePublish);

//router.delete('/:id', log, publishCtrl.deletePublish);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;