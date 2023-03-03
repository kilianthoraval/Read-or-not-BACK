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
        const book = req.body;
        const addBook = await dataMapper.library.newUserBook(book);
        if (addBook){
            res.status(200).json({})
        }
        else {
            res.json("500");
        }
    },
    async removeBookFromUserLibrary(req,res){
        const result = await dataMapper.library.deleteUserBook(req.params.id);

        if (result) {
            res.json(result);
        }
        else {
            res.json("500");
        }
    }
};

module.exports = libraryController;