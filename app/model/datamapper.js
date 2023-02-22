const client = require("../service/dbClient");

const books = {
    async getAllBooks() {
        const sqlQuery = "SELECT * FROM books;";
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
        const sqlQuery = `SELECT * FROM books WHERE id = ${bookID};`;

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
       const sqlQuery = 'SELECT * FROM users = $1' 
       try {
        const values = [email]
        const response = await client.query(sqlQuery,values);

        return response.rows[0];
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}

// const author = {
//     async getAuthorById(bookID) {
//         const sqlQuery = `SELECT * FROM books WHERE id = ${bookID};`;

//         try {
//             const response = await client.query(sqlQuery);

//             return response.rows;
//         }
//         catch (error) {
//             console.error(error);
//             return null;
//         }
//     }
// }


module.exports = books;