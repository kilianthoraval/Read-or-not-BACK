const dataMapper = require("../model/datamapper");


const bookController = {
    async getBooks(req,res){   
        const allBooks = await dataMapper.getAllBooks();

        if (allBooks) {
            res.json(allBooks);
        }
        else {
            res.json("500");
        }
    },
    async getBook(req,res){
        const bookID = req.params.id;
        const book = await dataMapper.getBookById(bookID);
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