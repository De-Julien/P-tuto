// Importation des modules. 
const { DataTypes } = require('sequelize');
const DB = require('../database/db')

// Création d'un modèle Publication.
const LikeModel = DB.define('Like', {
    myLike: {
        type: DataTypes.INTEGER,
    },
});

// Exportation pour pouvoir y accéder depuis un autre fichier.
module.exports = LikeModel;