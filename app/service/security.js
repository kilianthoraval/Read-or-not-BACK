const jwt = require('jsonwebtoken');
const User =require('../model/user');
const bcrypt = require('bcrypt');
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
    /**
     * Vérification du token de l'utilisateur
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkToken(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SESSION_SECRET);
            console.log("token validé !", user);
            next();
        }
        catch (error) {
            res.status(401);
            res.json()
        }
    },
    /**
     * Création d'un token à la connection de l'utilisateur
     * @param {*} req 
     * @param {*} res 
     */
    async checkLogin(req,res){
        const user = new User(req.body);
        console.log(user);
        const dbUser = await datamapper.users.getUserByEmail(password, user.email);
        // const hasMatchingPassword = await bcrypt.compare(password, user.password);
        console.log(dbUser);
        if(dbUser){
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
                console.log("mauvais password");
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