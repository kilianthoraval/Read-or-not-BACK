const dataMapper = require("../model/datamapper");


const bookController = {
    /**
     * Méthode pour renvoyer l'ensemble des livres
     * @param {*} req 
     * @param {*} res 
     */
    async getBooks(req,res){   
        const allBooks = await dataMapper.books.getAllBooks();

        if (allBooks) {
            res.json(allBooks);
        }
        else {
            res.json("500");
        }
    },

    /**
     * Méthode pour renvoyer un seul livre
     * @param {*} req 
     * @param {*} res 
     */
    async getBook(req,res){
        const bookID = req.params.id;
        const book = await dataMapper.books.getBookById(bookID);
        if (book){
            res.json(book[0]);
        }
        else {
            console.log("livre introuvable");
            res.json("500");
        }         
    }
};


module.exports = bookController;