// Sommaire/paramétrage de mon serveur
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session')
const router = require('./app/router.js')
const app = express();
app.use(express.urlencoded({extended:true}));

app.use(express.json());



// on ajoute un middleware, ici avec les options par défaut, n'importe quel domaine pourra interroger notre API
// voir la doc et les options si on veut être plus restrictif
app.use(cors())


/* Configuration des sessions */
const sessionConfig = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: (1000*60*60)
	},
};


/* Mise en place des sessions */
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`)
})