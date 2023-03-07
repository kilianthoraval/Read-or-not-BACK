const dataMapper = require("../model/datamapper");

const libraryController = {
    /**
     * Méthode pour récuperer l'ensemble des livres d'un utilisateur
     * @param {*} req 
     * @param {*} res 
     */
    async getUserLibrary(req,res){
        const allUserBooks = await dataMapper.library.userBooks();

        if (allUserBooks) {
            res.json(allUserBooks);
        }
        else {
            res.json("500");
        }
    },

    /**
     * Méthode d'insertion de livre dans la bibliothèque d'un utilisateur
     * @param {*} req 
     * @param {*} res 
     */
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

    /**
     * Méthode pour enlever un livre de la bibliothèque d'un utilisateur
     */
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