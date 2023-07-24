// Importation des modules.
const { DataTypes } = require('sequelize');
const DB = require('../database/db');
const UserModel = require('./user.model');
const LikeModel = require('./Like.model');
const ComentsModel = require('./coments.model');

// Création d'un modèle Publication.
const PublishModel = DB.define('Publish', {
    publishId: {
        // INTEGER correspond à un nombre entier, UNSIGNED correspond à un nombre positif.
        type: DataTypes.INTEGER.UNSIGNED,

        primaryKey: true,
        // Créer automatiquement un id et ajoute +1 pour chaque nouvelle création.
        autoIncrement: true,
        // Le champ ne peut pas être null.
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
    },
    video: {
        type: DataTypes.STRING,
    },

    message: {
        type: DataTypes.STRING,
        // Le champ ne peut pas être null.
        allowNull: false
    },
    like: {
        type: DataTypes.INTEGER,
        // Régle la valeur par defaut.
        defaultValue: 0
    }
});

// Lie les utilisateurs aux publications.
// Un utilisateur peut avoir plusieurs publications (hasMany).
// ForeignKey défini le nom du lien (Dans la base de données un colonne "userId" sera ajouté).
UserModel.hasMany(PublishModel, { foreignKey: "userId" });
// Une publication ne peut avoir qu'un seul utilisateur (belongsTo).
PublishModel.belongsTo(UserModel,  { foreignKey: "userId" });

// Lie les likes aux publications.
UserModel.belongsToMany(PublishModel, { foreignKey: "userId", through: LikeModel });
PublishModel.belongsToMany(UserModel, { foreignKey: "publishId", through: LikeModel });

// Lie les likes aux publications.
UserModel.belongsToMany(PublishModel, { foreignKey: "userId", through: ComentsModel });
PublishModel.belongsToMany(UserModel, { foreignKey: "publishId", through: ComentsModel });


// Exportation pour pouvoir y accéder depuis un autre fichier.
module.exports = PublishModel;