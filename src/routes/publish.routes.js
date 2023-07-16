// importations des modules.
const router = require('express').Router();
const publishCtrl = require('../controllers/publish.crud.ctrl');
const log = require('../middleware/login.jwt');
const multer = require('../middleware/upload.multer');

// Les routes possibles à utiliser.
router.get("/", log, publishCtrl.getAllPublish);
router.get("/like", log, publishCtrl.getAllLikes);
router.post('/', log, multer, publishCtrl.postPublish);
router.post('/:id/like', log, publishCtrl.postLikePublish);
router.put('/:id', log, publishCtrl.updatePublish);
router.delete('/:id', log, publishCtrl.deletePublish);

// Exportation pour pouvoir y accéder depuis un autre fichier.
module.exports = router;