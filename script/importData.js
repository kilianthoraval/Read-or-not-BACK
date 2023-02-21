require("dotenv").config();

const usersData = require("../data/users.json");
const booksData = require("../data/books.json");

const { Client } = require('pg');
const client = new Client();

async function insertBooks(){
    const tableName = "book";

    await client.query(`TRUNCATE ${tableName} CASCADE;`);

    for(const data of booksData){
        const sqlQuery = `INSERT INTO ${tableName} (title,author_id,category_id,description) VALUES ('${data.title}','${data.author_id}','${data.category_id}','${data.description}');`;
        await client.query(sqlQuery);
        console.log(sqlQuery);
    }

    
};

async function insertUsers(){
    const tableName = "user";

    await client.query(`TRUNCATE ${tableName} CASCADE;`);

    for(const data of usersData){
        const sqlQuery = `INSERT INTO ${tableName} (firstname,lastname,email,password) VALUES ($1,$2,$3,$4);`;
        const values = [data.firstname, data.lastname, data.email, data.password];
        await client.query(sqlQuery,values);
        console.log(sqlQuery);
    }

    
};


(async ()=>{
    await client.connect();
    await insertBooks();
    await insertUsers();
    await client.end();
})();
