const express = require('express');
const router = express.Router();
const bookController = require("./controller/bookController.js");
const searchController = require("./controller/searchController.js");
const userController = require("./controller/userController");
const security = require("./service/security");

router.get("/books",bookController.getBooks);
router.get("/book/:id",bookController.getBook);

// router.post("/createuser",userController.createUser)
router.post("/login",security.checkLogin)
router.get("/users",security.checkToken,userController.getUsers)

router.get("/author/:id",searchController.getAuthor);
router.get("/category/:id",searchController.getCategory);


module.exports = router;