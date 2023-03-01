const express = require('express');
const router = express.Router();
const bookController = require("./controller/bookController.js");
const libraryController = require('./controller/libraryController.js');
const searchController = require("./controller/searchController.js");
const userController = require("./controller/userController");
const security = require("./service/security");

router.get("/books",bookController.getBooks);
router.get("/book/:id",bookController.getBook);

router.post("/signup",userController.createUser);
router.post("/login",security.checkLogin);
router.get("/users",security.checkToken,userController.getUsers);

router.get("/author/:id",searchController.getAuthor);
router.get("/category/:id",searchController.getCategory);


router.get("/users/:id/books",security.checkToken,libraryController.getUserLibrary)
router.post("/users/:id/book/:id",security.checkToken,libraryController.addBookToUserLibrary)
router.delete("/users/:id/book/:id",security.checkToken,libraryController.removeBookFromUserLibrary)

module.exports = router;