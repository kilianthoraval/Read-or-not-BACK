const dataMapper = require("../model/datamapper");

const userController = {
    async getUsers(req,res){   
        // const allBooks = await dataMapper.getAllUsers();

        // if (allBooks) {
        //     res.json(allBooks);
        // }
        // else {
        //     res.json("500");
        // }
        res.json("coucou");
    },
};

module.exports = userController;
