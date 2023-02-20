require('dotenv').config();
const express = require('express');
// le package cors permet de spécifier la politique de cors
const cors = require('cors');
// on require express-session
const session = require('express-session')
// je require aussi mon router
const router = require('./app/router')

const app = express();

// on ajoute un middleware, ici avec les options par défaut, n'importe quel domaine pourra interroger notre API
// voir la doc et les options si on veut être plus restrictif
app.use(cors())

/* Mise en place des sessions */
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);
// on mets en place express-session
app.use(session({
    secret: process.env.SESSION_SECRET, // Required option = utilisé pour "encoder" les codes des sessions (coockies) pour éviter que quelqu'un de malveillant vole la session de quelqu'un d'autre
    // onle stocke dans les variables d'env pour qu'il soit vraiment secret !
    resave: true, // ré-enregistre les infos de la session entre chaque requête pour être sur que les donées ne soient pas perdues
    saveUninitialized: true, // quand un nouveau client arrive, on lui crée automatiquement une nouvelle sessions
  }));

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