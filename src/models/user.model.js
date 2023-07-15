// Importation des modules. 
const { DataTypes } = require("sequelize");
const DB = require("../database/db")

// Modèle pour la création d'un utilisateur.
const UserModel = DB.define( 'User', {
        userId: {
            // INTEGER correspond à un nombre entier, UNSIGNED correspond à un nombre positif.
            type: DataTypes.INTEGER,
            primaryKey: true,
            // Créer automatiquement un id et ajoute +1 pour chaque nouvelle création.
            autoIncrement: true,
            // Le champ ne peut pas être null.
            allowNull: false
        },
        pseudo: {
            // Limité à 20 caractères.
            type: DataTypes.STRING(20),
             // La valeur est unique.
            unique: true,
             // Le champ ne peut pas être null.
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            // La valeur est unique.
            unique: true,
            // Le champ ne peut pas être null.
            allowNull: false,
            // Utilise un format d'email pour valider le champ.
            validate: {
              isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
             // Le champ ne peut pas être null.
             allowNull: false
        },
        picture: {
            // Si la personne ne met pas d'image, il y en a une par defaut.
            type: DataTypes.STRING,
            defaultValue:"./images/default/random-user.png"
        }
    });

// Pour créer le modèle dans la base de données si elle n'existe pas.
//DB.sync();

// Exportation pour pouvoir y accéder depuis un autre fichier.
module.exports = UserModel;