const dataMapper = require("../model/datamapper");

const searchController = {
    async getAuthor(req,res){
        const authorID = req.params.id;
        const author = await dataMapper.getAuthorById(authorID);
        if (author){
            res.json(author[0]);
        }
        else {
            console.log("auteur introuvable");
            res.json("500");
        }         
    },
    async getCategory(req,res){
        const categoryID = req.params.id;
        const category = await dataMapper.getCategoryById(categoryID);
        if (category){
            res.json(category[0]);
        }
        else {
            console.log("genre introuvable");
            res.json("500");
        }         
    }
};

module.exports = searchController;