// Importation des modules.
const { DataTypes } = require('sequelize');
const DB = require('../database/db')

// Création d'un modèle Publication.
const ComentsModel = DB.define('coments', {
    coments: {
        type: DataTypes.STRING,
        // Le champ ne peut pas être null.
        allowNull: false
    }
});

// Exportation pour pouvoir y accéder depuis un autre fichier.
module.exports = ComentsModel;