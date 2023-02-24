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

    async createUser(req,res){
        const user = new User(req.body);
        const insertUser = await dataMapper.users.insertUser();
    }
};

module.exports = userController;
