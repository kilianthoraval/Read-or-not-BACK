const client = require("../service/dbClient");

const books = {
    async getAllBooks() {
        const sqlQuery = "SELECT * FROM book;";
        try {
            const response = await client.query(sqlQuery);

            return response.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    async getBookById(bookID) {
        const sqlQuery = `SELECT * FROM book WHERE id = ${bookID};`;

        try {
            const response = await client.query(sqlQuery);

            return response.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
};


const author = {
    async getAuthorByName(authorName) {
        const sqlQuery = `SELECT * FROM book
        JOIN author ON author_id = author.id
        WHERE author.firstname = $1
        OR author.lastname = $1`;

        try {
            const values = [authorName]
            const response = await client.query(sqlQuery,values);

            return response.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
};

const category = {
    async getCategoryByName(categoryName) {
        const sqlQuery = `SELECT * FROM book
        JOIN category ON category_id = category.id
        WHERE category.name = $1`

        try {
            const values = [categoryName]
            const response = await client.query(sqlQuery,values);

            return response.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
};

const users = {
    async getAllUsers() {
        const sqlQuery = "SELECT * FROM users;";
        try {
            const response = await client.query(sqlQuery);

            return response.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    async getUserByEmail(email) {
        const sqlQuery = 'SELECT * FROM users WHERE email = $1' 
        try {
         const values = [email]
         const response = await client.query(sqlQuery,values);
 
         return response.rows[0];
         }
         catch (error) {
             console.error(error);
             return null;
         }
     },
     async insertUser(){
        
     }
};


module.exports = { books,author,users,category };