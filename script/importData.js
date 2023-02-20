const categories = require("../data/books.json");

require("dotenv").config();
const {CLient, Client} = require("pg");
const client = new Client();