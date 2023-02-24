const dataMapper = require("../model/datamapper");

const searchController = {
    async getAuthor(req,res){
        const authorName = req.params.id;
        const author = await dataMapper.author.getAuthorByName(authorName);
        if (author){
            res.json(author[0]);
        }
        else {
            console.log("auteur introuvable");
            res.json("500");
        }         
    },

    async getCategory(req,res){
        const categoryName = req.params.id;
        const category = await dataMapper.category.getCategoryByName(categoryName);
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