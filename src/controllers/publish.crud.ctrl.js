// Importation des modules.
const PublishModel = require('../models/publish.model');
const UserModel = require('../models/user.model')
const fs = require('fs');

// Fonction de la route GET (getAllPublish).
exports.getAllPublish = (req, res) => {
    // Récupère toutes les publications de la base de données.
    // Inculde ajoute les paramètres du modèle choisi.
    // Attributes avec exclude permet d'exclure les paramètres choisi du modèle.
    PublishModel.findAll(
        {
            include: [{ model: UserModel, attributes: { exclude: ["createdAt", "updatedAt", "email", "password"] } }],
        })
        .then((allPublish) => res.status(200).json(allPublish))
        .catch(error => res.status(400).json({ error }))
};
// Fonction de la route GET (getAllLikes).
exports.getAllLikes = (req, res) => {

};
// Fonction de la route POST (postPublish).
exports.postPublish = (req, res) => {
    if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        const createPublish = new PublishModel({
            ...req.body,
            userId: req.auth.userId,
            picture: imageUrl
        });
        // Sauvegarde dans la base de données.
        createPublish.save()
            .then(() => res.status(201).json({
                message: 'Publication créé !'
            }))
            .catch(error => {
                // Récupère l'image à modifier.
                const filename = imageUrl.split('/images/')[1];
                // Efface l'image sélectionnée au-dessus.
                fs.unlink(`src/images/user/${filename}`, (error) => {
                    if (error) throw error;
                })
                res.status(400).json({ error })
            })
    } else {
        const createPublish = new PublishModel({
            ...req.body,
            userId: req.auth.userId
        });
        // Sauvegarde dans la base de données.
        createPublish.save()
            .then(() => res.status(201).json({
                message: 'Publication créé !'
            }))
            .catch(error => {
                res.status(400).json({ error })
            })
    }
};
// Fonction de la route POST (postLikePublish).
exports.postLikePublish = (req, res) => {

};
// Fonction de la route PUT (updatePublish).
exports.updatePublish = (req, res) => {
    // Trouve l'ID du produit dans la base de données.
    PublishModel.findOne({ where: { publishId: req.params.id } })
        .then((onePublish) => {
            // Contrôle si l'userId de la base de données est différent de celui du token.
            if (onePublish.userId == req.auth.userId) {
                // Si une image est envoyé.
                if (req.file) {
                    // Si il n'y a pas de photo dans la base de données.
                    if (!onePublish.picture) {
                        // Récupère l'image pour l'ajouter a la publication.
                        const updateBodyPublish = ({
                            picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                        });
                        // Met à jour la base de données.
                        onePublish.update({ ...updateBodyPublish, publishId: req.params.id })
                            .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                            .catch(error => res.status(404).json({ error }));
                    } else {
                        // Récupère l'image et le texte pour modifier la publication.
                        const updateBodyPublish = ({
                            ...req.body,
                            picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                        });
                        // Récupère l'image à modifier.
                        const filename = onePublish.picture.split('/images/')[1];
                        // Efface l'image sélectionner au-dessus.
                        fs.unlink(`src/images/user/${filename}`, (error) => {
                            if (error) throw error;
                        });
                        // Met à jour la base de données.
                        onePublish.update({ ...updateBodyPublish, publishId: req.params.id })
                            .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                            .catch(error => res.status(404).json({ error }));
                    }
                } else {
                   // Met à jour la base de données.
                    onePublish.update(req.body)
                        .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                        .catch(error => res.status(404).json({ error }));
                }
            } else {
                // Si une image est envoyé.
                if (req.file) {
                    res.status(401).json({ message: "autorisation refusé !!" });
                    // Supprime l'image envoyé.
                    fs.unlink(`src/images/user/${req.file.filename}`, (error) => {
                        if (error) throw error;
                    });
                } else {
                    res.status(401).json({ message: "autorisation refusé !!" });
                }
            }
        })
        .catch(error => res.status(500).json({ error }))
};
// Fonction de la route DELETE (deletePublish).
exports.deletePublish = (req, res) => {
    // trouve l'ID du produit dans la base de données
    PublishModel.findOne({ where: { publishId: req.params.id } })
        .then((onePublish) => {
           // Contrôle si l'userId de la base de données est différent de celui du token.
            if (onePublish.userId == req.auth.userId) {
                if (onePublish.picture) {
                    // Récupère l'image à modifier.
                    const filename = onePublish.picture.split('/images/')[1];
                    // Efface l'image sélectionner au-dessus.
                    fs.unlink(`src/images/user/${filename}`, (error) => {
                        if (error) throw error;
                    })
                    // Efface la publication selectionné dans la base de données.
                    onePublish.destroy()
                        .then(() => res.status(200).json({ message: "La publication à été supprimée !!" }))
                        .catch(error => res.status(500).json({ error }))
                } else {
                     // Efface la publication selectionné dans la base de données.
                    onePublish.destroy()
                        .then(() => res.status(200).json({ message: "La publication à été supprimée !!" }))
                        .catch(error => res.status(500).json({ error }))
                }
            } else {
                res.status(401).json({ message: "autorisation refusé !!" });
            }
        })
        .catch(error => res.status(500).json({ error }))
};

