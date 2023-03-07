const express = require('express');
const router = express.Router();
const bookController = require("./controller/bookController.js");
const libraryController = require('./controller/libraryController.js');
const searchController = require("./controller/searchController.js");
const userController = require("./controller/userController");
const security = require("./service/security");

// Routes par livres
router.get("/books",bookController.getBooks);
router.get("/book/:id",bookController.getBook);

// Routes de gestion d'utilisateurs
router.post("/signup",userController.createUser);
router.post("/login",security.checkLogin);
router.get("/users",security.checkToken,userController.getUsers);

// Routes permettant la recherche de données
router.get("/author/:id",searchController.getAuthor);
router.get("/category/:id",searchController.getCategory);
router.get("/search",searchController.getInputSearch);
// router.get("/authors",)
// router.get("/categories",)
// router.get("/book/authors/:id_author",)
// router.get("/book/categories/:id_category",)

// Routes permettant la gestion de la bibliothèque d'un utilisateur
router.get("/users/:id_user/books",security.checkToken,libraryController.getUserLibrary)
router.post("/users/:id_user/book/:id_book",security.checkToken,libraryController.addBookToUserLibrary)
router.delete("/users/:id_user/book/:id_book",security.checkToken,libraryController.removeBookFromUserLibrary)

module.exports = router;