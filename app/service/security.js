const jwt = require('jsonwebtoken');
const User =require('../model/user');
const datamapper =require('../model/datamapper');

const securityService = {
    /**
     * Vérification pour voir si l'utilisateur est connecté
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isConnected(req, res, next) {
        if (req.session.user) {
            // user est présent, je continue mon chemin
            next();
        }
        else {
            // user est absent, je redirige vers la homepage
            res.redirect("/");
        }
    },
    checkToken(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SESSION_SECRET);
            console.log("token validé !", user);
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    },
    async checkLogin(req,res){
        // on génère une instance de User à partir de req.body qui contient username et password
        const user = new User(req.body);
        
        // on appelle la méthode qui va vérifier les infos en BDD et rempli les informations de notre user
        // la méthode renvoie true ou false suivant si les informations username/password sont correctes
        const dbUser = await datamapper.getUserByEmail(user.email);
        if(dbUser){
            console.log(user);
            if(dbUser['password'] == user.password){
                 // Génération du token
                const token = jwt.sign({username:user.email}, process.env.SESSION_SECRET);
                console.log("TOKEN : ",token);

                // on enregistre le user courant dans la session
                req.session.user = user;
                // on envoie le token généré au client
                res.json({
                    token
                })
            }
            else{
                    // erreur dans le couple username/password, on renvoie false au client
                res.status(500).json({
                    error:"ceci n'est pas correct!"
            });
            }            
        }
        else{
            // erreur dans le couple username/password, on renvoie false au client
            res.status(500).json({
                error:"ceci n'est pas correct!"
            });
        }
    }
};

module.exports = securityService;