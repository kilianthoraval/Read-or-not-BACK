const dataMapper = require("../model/datamapper");
const bcrypt = require('bcrypt');
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

    async createUser(req,res) {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const { pseudo, email, password } = req.body;
        console.log(pseudo,email,password);
        // if (!email || !password || !confirmation || password !== confirmation) throw new Error('données invalides');
        
        try {
            const user = await dataMapper.users.insertUser({ pseudo, email, password: encryptedPassword });
            console.log(user);
            return res.json(user);
            }
         catch (err) {
            return res.status(500).json();
        }
    }
};

module.exports = userController;
