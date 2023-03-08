const dataMapper = require("../model/datamapper");
const bcrypt = require('bcrypt');
const User =require('../model/user');

const userController = {
    /**
     * Méthode de récupération des utilisateurs
     * @param {*} req 
     * @param {*} res 
     */
    async getUsers(req,res){   
        const allUsers = await dataMapper.users.getAllUsers();

        if (allUsers) {
            res.json(allUsers);
        }
        else {
            res.json("500");
        }
    },

    /**
     * Méthode pour la création d'un utilisateur
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async createUser(req,res) {
        const { pseudo, email, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log(pseudo,email,password);
        
        try {
            const user = await dataMapper.users.insertUser({ pseudo, email, password : encryptedPassword });
            console.log(user);
            return res.json(user);
            }
         catch (err) {
            return res.status(500).json();
        }
    }
};

module.exports = userController;
