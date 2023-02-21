const client = require("../service/dbClient");

const dataMapper = {
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
    }
}