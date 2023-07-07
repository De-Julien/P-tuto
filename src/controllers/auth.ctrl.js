// Importation des modules.
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

// Fonction de la route POST (signUp)
exports.signUp = (req, res) => {
    // Récupère le Mdp envoyé pour l'inscription et le crypte.
    bcrypt.hash(req.body.password, 10)
        // Remplace le Mdp par le Mdp hash.
        .then(hash => {
            const createUser = new UserModel({
                email: req.body.email,
                password: hash
            })
            // Sauvegarde le nouvel utilisateur dans la base de données.
            createUser.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch(err => res.status(400).json({ message: `L'utilisateur n'a pas été créé, informations incorrectes ou email déjà utilisé ${err}` }))
        })
        .catch(err => res.status(400).json({ message: `Le mot de passe est un champ obligatoire ${err}` }))
};