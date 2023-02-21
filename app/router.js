const express = require('express');
const router = express.Router();
const bookController = require("./controller/bookController.js");
const searchController = require("./controller/searchController.js");

router.get("/books",bookController.getBooks);
router.get("/book/:id",bookController.getBook);

// router.get("/author/:id",searchController.findAuthor);
// router.get("/category/:id",searchController.findCategory);


module.exports = router;