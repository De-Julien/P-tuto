// importations des modules.
const express = require('express');
require('dotenv').config();
require('./src/database/db');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const userRoutes = require('./src/routes/user.routes');
const publishRoutes = require('./src/routes/publish.routes');

// Utilise express pour chaque appel de app.
const app = express();

const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials:true,
    'allowHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
};

app.use(cors({ corsOption }));

// Gère les requêtes du type json.
app.use (express.json());

// Pour lancer morgan et la favicon au démarrage.
app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('dev'));

// Route pour les utilisateurs.
app.use('/api/user', userRoutes);
// Route pour les publications.
app.use("/api/publish", publishRoutes);
// route pour les images
app.use("/images", express.static(path.join(__dirname, "images")));

// Le serveur écoute les requêtes sur le port désigné.
app.listen(process.env.PORT, () => {
    console.log(`Actuellement sur le port ${process.env.PORT}.`);
});