// Importation des modules.
const PublishModel = require('../models/publish.model');
const UserModel = require('../models/user.model');
const LikeModel = require('../models/Like.model');
const fs = require('fs');

// Fonction de la route GET (getAllPublish).
exports.getAllPublish = (req, res) => {
    // Récupère toutes les publications de la base de données.
    // Inculde ajoute les paramètres du modèle choisi.
    // Attributes avec exclude permet d'exclure les paramètres choisi du modèle.
    PublishModel.findAll(
        {
            include: [{ model: UserModel, attributes: { exclude: ["createdAt", "updatedAt", "email", "password", "userId"] } }],
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
    // Cherche dans la base de données la publication.
    PublishModel.findOne({ where: { PublishId: req.params.id } })
        .then((onePublish) => {
            // Cherche dans la base de données le like de la publication en fonction de l'utilisateur.
            LikeModel.findOne({ where: { publishId: req.params.id, userId: req.auth.userId } })
                .then((likeList) => {
                    const createLike = new LikeModel({
                        ...req.body,
                        userId: req.auth.userId,
                        publishId: onePublish.publishId
                    })
                    // Si l'utilisateur n'a pas encore like la publication.
                    if (!likeList) {
                        if (req.body.myLike === 1) {

                            onePublish.increment({ like: 1 }, { where: { publishId: req.params.id } })
                                .then(() => res.status(200))
                                .catch((error) => res.status(400).json({ error }));
                            createLike.save()
                                .then(() => res.status(200).json({ message: "J'aime" }))
                                .catch((error) => res.status(400).json({ error }));
                        } else {
                            res.status(401).json({ message: "Le vote n'a pas été effectué, vérifier les données envoyées !" });
                        }
                    } // Si l'utilisateur a like la publication.
                    else {
                        if (likeList.myLike === 0 && req.body.myLike === 1) {
                            onePublish.increment({ like: 1 }, { where: { publishId: req.params.id } })
                                .then(() => res.status(200))
                                .catch((error) => res.status(400).json({ error }));
                            likeList.update(req.body)
                                .then(() => res.status(200).json({ message: "J'aime" }))
                                .catch((error) => res.status(400).json({ error }));
                        } else if (likeList.myLike === 1 && req.body.myLike === 0) {
                            onePublish.increment({ like: -1 }, { where: { publishId: req.params.id } })
                                .then(() => res.status(200))
                                .catch((error) => res.status(400).json({ error }));
                            likeList.update(req.body)
                                .then(() => res.status(200).json({ message: "Je n'aime plus" }))
                                .catch((error) => res.status(400).json({ error }));
                        }
                        else {
                            res.status(401).json({ message: "Le vote a déjà été effectué" });
                        }
                    }
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
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
    // Trouve l'ID du produit dans la base de données.
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

