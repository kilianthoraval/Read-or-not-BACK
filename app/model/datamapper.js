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