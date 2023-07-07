// importations des modules.
const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const favicon = require('serve-favicon');
require('./src/database/db');


// Utilise express pour chaque appel de app.
const app = express();

app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('dev'));


app.get('/', (req, res) => res.send ('hey salutations'));
// Le serveur écoute les requêtes sur le port désigné.
app.listen(process.env.PORT, () => {
    console.log(`Actuellement sur le port ${process.env.PORT}.`);
});