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
        const sqlQuery = `SELECT id,title,description,img, 
        (SELECT json_build_object('id',id,'firstname',firstname,'lastname',lastname)AS author FROM author WHERE id = author_id), 
        (SELECT json_build_object('id',id,'name',name)AS category FROM category WHERE id = category_id)
         FROM book WHERE id = ${bookID};`;

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
     async insertUser(user){
        const sqlQuery = "INSERT INTO users (pseudo,email,password) VALUES ($1,$2,$3) RETURNING *;";
        const values = [user.pseudo,user.email,user.password];
        try {
            const response = await client.query(sqlQuery,values);
            result = response.rows[0];
        }
        catch (error) {
            console.error("PG",error);
        }
        return result;
     }
};

const library = {
    //récuperer l'ensemble des livres d'un utilisateur avec ( user_id ) AGG
    async userBooks(){
        const sqlQuery = `SELECT book.*,readornot,comment,rate FROM book
        JOIN library ON library.book_id = book.id
        WHERE library.user_id = user.id`;
        try {
            const response = await client.query(sqlQuery);

            return response.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    //Ajouter un livre avec ( book_id ) dans la bibliothèque d'un utilisateur avec ( user_id )
    async newUserBook(bookId, userId){
        const sqlQuery = `INSERT INTO library (book_id, user_id) VALUES ($1,$2) `;
        try {
            const values = [bookId, userId]
            await client.query(sqlQuery,values);
            
            return true;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    //Supprimer un livre avec l'id ( book_id ) dans la bibliothèque d'un utilisateur ( user_id )
    async deleteUserBook(userId, bookId){
        const sqlQuery = `DELETE FROM library WHERE user_id = $1 AND book_id = $2`;
        try {
            const values = [userId, bookId]
            await client.query(sqlQuery,values);

            return true;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
};

const search = {
    async inputSearch(search){
        const sqlQuery = `SELECT book.id, book.title, book.description, book.img, category.name, author.firstname, author.lastname FROM book
        JOIN author ON author_id = author.id
        JOIN category on category_id = category.id
        WHERE author.firstname ILIKE $1 OR
        author.lastname ILIKE $1 OR
        category.name ILIKE $1 OR
        book.title ILIKE $1`;

        try{
            const values = [`%${search}%`]
            const response = await client.query(sqlQuery,values);
            return response.rows
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }   
};




module.exports = { books,author,users,category,library, search };