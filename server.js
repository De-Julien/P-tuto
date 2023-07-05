// importations des modules.
const express = require('express');
require('dotenv').config();

// Utilise express pour chaque appel de app.
const app = express();

// Le serveur écoute les requêtes sur le port désigné.
app.listen(process.env.PORT, () => {
    console.log(`Actuellement sur le port ${process.env.PORT}.`);
});