// Importation des modules.
const { Sequelize } = require('sequelize');

// Connexion a la base de données.
const sequelize = new Sequelize (
    // Nom de la base de données.
    process.env.DB_NAME,
    // Identifiant utilisé pour la base de données.
    process.env.DB_USERNAME,
    // mdp utilisé pour la base de données.
    process.env.DB_PASSWORD,
    {
        // Indique ou se trouve la base de données.
        host: 'localhost',
        // nom du language de la base de données.
        dialect: "mysql"
    }  
);

// Vérification que la connexion à la base de données est réussi.
sequelize.authenticate()
    .then(() => console.log('Connecté à la base de données MySQL!'))
    .catch(error => console.error('Impossible de se connecter, erreur suivante :', error));

// Exportation pour pouvoir y accéder depuis un autre fichier.
module.exports = sequelize;
