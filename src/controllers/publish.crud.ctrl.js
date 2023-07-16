// Importation des modules.
const PublishModel = require('../models/publish.model');
const fs = require('fs');

// Fonction de la route GET (getAllPublish).
exports.getAllPublish = (req, res) => {

};
// Fonction de la route GET (getAllLikes).
exports.getAllLikes = (req, res) => {

};
// Fonction de la route POST (postPublish).
exports.postPublish = (req, res) => {
    if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/picture/${req.file.filename}`
        const createPublish = new Publish({
            ...req.body,
            userId: req.auth.userId,
            imageUrl
        });
        // sauvegarde dans la base de données
        createPublish.save()
            .then(() => res.status(201).json({
                message: 'Publication créé !'
            }))
            .catch(error => {
                // récupère l'image à modifier
                const filename = imageUrl.split('/images/')[1];
                // efface l'image sélectionner au-dessus
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                })
                res.status(400).json({ error })
            })
    } else {
        const createPublish = new PublishModel({
            ...req.body,
            userId: req.auth.userId
        });
        // sauvegarde dans la base de données
        createPublish.save()
            .then(() => res.status(201).json({
                message: 'Publication créé !'
            }))
            .catch(error => {
                res.status(400).json({ error })
            })
    }
};
/*
    const createPublish = new PublishModel({
        ...req.body,
        userId: req.auth.userId,
    });
     // sauvegarde dans la base de données
     createPublish.save()
     .then(() => res.status(201).json({
         message: 'Publication créé !'
     }))
     .catch(error => {
         res.status(400).json({ error })
     })
     */

// Fonction de la route POST (postLikePublish).
exports.postLikePublish = (req, res) => {

};
// Fonction de la route PUT (updatePublish).
exports.updatePublish = (req, res) => {

};
// Fonction de la route DELETE (deletePublish).
exports.deletePublish = (req, res) => {

};

