// Importation des modules. 
const { Sequelize, DataTypes } = require("sequelize");

// Modèle pour la création d'un utilisateur.
module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define( 'User', {
        id: {
            // INTEGER correspond à un nombre entier, UNSIGNED correspond à un nombre positif
            type: DataTypes.INTEGER,
            primaryKey: true,
            // Créer automatiquement un id et ajoute +1 pour chaque nouvelle création
            autoIncrement: true,
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
        }
    })
};