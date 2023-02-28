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
        const { pseudo, email, password } = req.body;
        // if (!email || !password || !confirmation || password !== confirmation) throw new Error('données invalides');
        
        try {
            const user = await datamapper.insertUser({ pseudo, email, password });
            return res.json(user);
            }
         catch (err) {
            return res.status(500).json(error.message);
        }
    }
};

module.exports = userController;
