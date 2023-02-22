require("dotenv").config();

const categoryData = require("../data/category.json")
const authorData = require("../data/author.json")
const usersData = require("../data/users.json");
const booksData = require("../data/books.json");

const { Client } = require('pg');
const client = new Client();

async function insertBooks(){
    const tableName = "book";

    await client.query(`TRUNCATE ${tableName} CASCADE;`);

    for(const data of booksData){
        const sqlQuery = `INSERT INTO ${tableName} (id,title,author_id,category_id,description) VALUES ($1,$2,$3,$4,$5);`;
        const values = [data.id,data.title,data.author,data.category,data.description];
        await client.query(sqlQuery,values);
        console.log(sqlQuery);
    }    
};

async function insertUsers(){
    const tableName = "users";

    await client.query(`TRUNCATE ${tableName} CASCADE;`);

    for(const data of usersData){
        const sqlQuery = `INSERT INTO ${tableName} (firstname,lastname,email,password) VALUES ($1,$2,$3,$4);`;
        const values = [data.firstname, data.lastname, data.email, data.password];
        await client.query(sqlQuery,values);
        console.log(sqlQuery);
    }    
};

async function insertAuthor(){
    const tableName = "author";

    await client.query(`TRUNCATE ${tableName} CASCADE;`);

    for(const data of authorData){
        const sqlQuery = `INSERT INTO ${tableName} (id,firstname,lastname) VALUES ($1,$2,$3);`;
        const values = [data.id,data.firstname,data.lastname];
        await client.query(sqlQuery,values);
        console.log(sqlQuery);
    }    
};

async function insertCategory(){
    const tableName = "category";

    await client.query(`TRUNCATE ${tableName} CASCADE;`);

    for(const data of categoryData){
        const sqlQuery = `INSERT INTO ${tableName} (id,name) VALUES ($1,$2);`;
        const values = [data.id,data.name];
        await client.query(sqlQuery,values);
        console.log(sqlQuery);
    }    
};



(async ()=>{
    await client.connect();    
    await insertUsers();
    await insertAuthor();
    await insertCategory();
    await insertBooks();
    await client.end();
})();
