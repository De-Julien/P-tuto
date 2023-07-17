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
            .then(() =>  res.status(201).json({
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
  // trouve l'ID du produit dans la base de données
  Publish.findOne({ where: { id: req.params.id } })
  .then((onePublish) => {
      // contrôle si l'ID de la base de données est différent de celui du token
      if (onePublish.userId == req.auth.userId || req.auth.isAdmin == true) {
          // si une image est envoyé
          if (req.file) {
              if (!onePublish.imageUrl) {
                   // casse l'objet et change l'image
                   const updateBodyPublish = ({
                      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                  });
                   // met à jours la base de données
                   onePublish.update({ ...updateBodyPublish, id: req.params.id })
                   .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                   .catch(error => res.status(404).json({ error }));
              } else {
                  // casse l'objet et change l'image
                  const updateBodyPublish = ({
                      ...req.body,
                      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                  });
                  // récupère l'image à modifier
                  const filename = onePublish.imageUrl.split('/images/')[1];
                  // efface l'image sélectionner au-dessus
                  fs.unlink(`images/${filename}`, (error) => {
                      if (error) throw error;
                  });
                  // met à jours la base de données
                  onePublish.update({ ...updateBodyPublish, id: req.params.id })
                      .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                      .catch(error => res.status(404).json({ error }));
              }
          } else {
              // met à jours la base de données
              onePublish.update(req.body)
                  .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                  .catch(error => res.status(404).json({ error }));
          }
      } else {
          // si une image est envoyé
          if (req.file) {
              res.status(401).json({ message: "autorisation refusé !!" });
              // supprime l'image envoyé
              fs.unlink(`images/${req.file.filename}`, (error) => {
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
   PublishModel.findOne({ where: { id: req.params.id } })
   .then((onePublish) => {
       // contrôle si l'ID de la base de données est différent de celui du token
       if (onePublish.userId == req.auth.userId) {
           if (onePublish.imageUrl) {
               // récupère l'image à modifier
               const filename = onePublish.imageUrl.split('/images/')[1];
               // efface l'image sélectionner au-dessus
               fs.unlink(`images/${filename}`, (error) => {
                   if (error) throw error;
               })
               // efface la sauce selectionné de la base de données
               onePublish.destroy()
                   .then(() => res.status(200).json({ message: "La publication à été supprimée !!" }))
                   .catch(error => res.status(500).json({ error }))
           } else {
               // efface la sauce selectionné de la base de données
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

