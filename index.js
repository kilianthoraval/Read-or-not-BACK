require('dotenv').config();
const express = require('express');
// le package cors permet de spécifier la politique de cors
const cors = require('cors');

// je require aussi mon router
const router = require('./app/router')

const app = express();

// on ajoute un middleware, ici avec les options par défaut, n'importe quel domaine pourra interroger notre API
// voir la doc et les options si on veut être plus restrictif
app.use(cors())

/* Mise en place des sessions */
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);


// Note: pensez qu'on va faire des routes POST ! (donc avec des body ...)
// pour avoir accès aux body en POST on a beosoin d'un body-parser
// ce middleware nous mets à disposition la clé ".body" dans l'objet "request"
app.use(express.urlencoded({extended:true}));
// on informe express que le contenu du body sera du json
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`)
})