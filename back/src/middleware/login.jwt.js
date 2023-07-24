// Importation des modules.
const jwt = require('jsonwebtoken');

// Exportation de la procédure d'authentification.
module.exports = (req, res, next) => {
    try {
        // Récupère le token.
        const token = req.headers.authorization.split(" ")[1];
        // Décode le token avec la clé de chiffrement.
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.id;
        req.auth = {
            userId: userId,
        };
        next();
    } catch (err) {
        res.status(401).json({ message: `vous devez vous connecter ! ${err}` });
    }
};