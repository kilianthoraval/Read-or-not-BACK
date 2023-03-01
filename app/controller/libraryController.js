const dataMapper = require("../model/datamapper");

const libraryController = {
    async getUserLibrary(req,res){
        const allUserBooks = await dataMapper.library.userBooks();

        if (allUserBooks) {
            res.json(allUserBooks);
        }
        else {
            res.json("500");
        }
    },
    async addBookToUserLibrary(req,res){

    },
    async removeBookFromUserLibrary(req,res){

    }
};

module.exports = libraryController;