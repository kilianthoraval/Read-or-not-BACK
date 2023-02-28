const dataMapper = require("../model/datamapper");
const User =require('../model/user');

const userController = {
    async getUsers(req,res){   
        const allUsers = await dataMapper.users.getAllUsers();

        if (allUsers) {
            res.json(allUsers);
        }
        else {
            res.json("500");
        }
    console.log('coucou');
    },

    async createUser(req, res) {
        // on récupère sous forme de variables les différentes valeurs reçues
        const { firstname, lastname, email, password, confirmation } = request.body;
        try {
          // on vérifie que tous les champs obligatoires sont renseignés
          if (!email || !password || !confirmation) {
            return res.satus("201")
          }
                // on vérifie que les 2 mots de passe sont les mêmes
        if (password !== confirmation) {
            return response.render('signup', { errorMessage: 'Le mot de passe et sa confirmation ne correspondent pas.' })
        }
        await User.create({ firstname, lastname, email, password: encryptedPassword })
        // on redirige vers le form de connexion
        response.redirect('/login');
        }
         catch (err) {
        console.error(err);
        response.status(500);
        }
    }
};

module.exports = userController;
