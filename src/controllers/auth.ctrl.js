// Importation des modules.
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction de la route POST (signUp).
exports.signUp = (req, res) => {
    // Récupère le Mdp envoyé pour l'inscription et le crypte.
    bcrypt.hash(req.body.password, 10)
        // Remplace le Mdp par le Mdp hash.
        .then(hash => {
            if (req.body.pseudo.length < 3) {
                res.status(400).json({ message: "Le pseudo doit contenir au moins 3 caratctères !" })
            } else if (req.body.password.length < 8) {
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
// Fonction de la route POST (signIn).
exports.signIn = (req, res) => {
    // Regarde dans la base de données si l'utilisateur s'y trouve.
    UserModel.findOne({ where: { email: req.body.email } })
        .then(user => {
            // Si l'utilisateur n'est pas dans la base de données.
            if (user === null) {
                res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                // si l'utilisateur est dans la base de données.
            } else {
                // Vérifie si le mot de passe est bien celui de la base de données.
                bcrypt.compare(req.body.password, user.password)
                    .then(validPassword => {
                        // Si le Mdp n'est pas bon.
                        if (!validPassword) {
                            res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                            // Si le Mdp est le bon .
                        } else {
                            // Envoie token à l'utilisateur.
                            res.status(200).json({
                                userId: user.id,
                                token: jwt.sign(
                                    {
                                        id: user.id,
                                        pseudo: user.pseudo,
                                        email: user.email,
                                        picture: user.picture
                                    },
                                    `${process.env.RANDOM_TOKEN_SECRET}`,
                                    { expiresIn: '12h' }
                                )
                            })
                        }
                    })
                    .catch(err => res.status(500).json({ message: `une erreur est survenue ! ${err}` }))
            }
        })
        .catch(err => res.status(500).json({ message: `une erreur est survenue ! ${err}` }))
};
// Fonction de la route GET (logout).
exports.logout = (req, res) => {

};