// Importation des modules.
const multer = require('multer');

// Fonction pour filter les fichiers.
// Exemple ici seul les fichiers jpg,jpeg et png sont acceptés.
const multerFilter = (req, file, cb) => {
    const type = file.mimetype.split("/")[1]
    if (type === "jpg" || type === "jpeg" || type === "png") {
      cb(null, true);
    } else {
      cb(new Error("Format incorrecte, seul les images de type jpg,jpeg et png sont accepté !"), false);
    }
  };
// Fonction qui défini ou les fichiers vont être enregistrés.
const storage = multer.diskStorage({
    // Chemin ou le fichier est enregistré.
    destination: (req, file, cb) => {
        cb(null, 'src/images/user')
    },
    // Gère les noms des fichiers pour éviter d'avoir les mêmes 2 foi.
    filename: (req, file, cb) => {
        const name = file.fieldname.split(' ').join('_');
        const ext = file.mimetype.split("/")[1];
        cb(null, name + '_' + Date.now() + '.' + ext);
    }
});
// Fonction qui lance les diverses paramètres définis.
const uploadImage =  multer({
    storage: storage,
    fileFilter: multerFilter
  });

// exportation pour pouvoir y accéder depuis un autre fichier.
module.exports = uploadImage.single('picture');
// Picture ici est le nom du fichier dans la requête.