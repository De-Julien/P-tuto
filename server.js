// importations des modules.
const express = require('express');
require('dotenv').config();
require('./src/database/db');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const userRoutes = require('./src/routes/user.routes');

// Utilise express pour chaque appel de app.
const app = express();

// attrape les toutes les requêtes du type json
app.use (express.json());

// Pour lancer morgan et la favicon au démarrage.
app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('dev'));

app.use('/api/user', userRoutes);
// Le serveur écoute les requêtes sur le port désigné.
app.listen(process.env.PORT, () => {
    console.log(`Actuellement sur le port ${process.env.PORT}.`);
});