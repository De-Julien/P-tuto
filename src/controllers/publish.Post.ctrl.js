// Importation des modules.
const PublishModel = require('../models/publish.model');

// fonction de la route POST (postPublish)
exports.postPublish = (req, res) => {
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
};







/*
 if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
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
        const createPublish = new Publish({
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
*/