// Importation des modules.
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

// Fonction de la route POST (signUp)
exports.signUp = (req, res) => {
    // Récupère le Mdp envoyé pour l'inscription et le crypte.
    bcrypt.hash(req.body.password, 10)
        // Remplace le Mdp par le Mdp hash.
        .then(hash => {
            if (req.body.pseudo.length < 3) {
                res.status(400).json({ message: "Le pseudo doit contenir au moins 3 caratctères !" })
            } else if (req.body.password.length < 8){
                res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caratctères !" })
            } else {
                const createUser = new UserModel({
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password: hash
                })
                 // Sauvegarde le nouvel utilisateur dans la base de données.
            createUser.save()
            .then(() => res.status(201).json({
                message: 'Utilisateur créé !'
            }))
            .catch(err => res.status(400).json({ message: `L'utilisateur n'a pas été créé, email incorrecte ou déjà utilisé. ${err}` }))
            }
           
        })
        .catch(err => res.status(400).json({ message: `Les informations envoyés ne sont pas valides. ${err}` }))
};