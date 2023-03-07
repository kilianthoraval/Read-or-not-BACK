require("dotenv").config();

const categoryData = require("../data/category.json")
const authorData = require("../data/author.json")
const usersData = require("../data/users.json");
const booksData = require("../data/books.json");

//initialisation
    //connection a la BDD
const { Client } = require('pg');
const client = new Client();

//1. importer les livres
async function insertBooks(){
    const tableName = "book";

    await client.query(`TRUNCATE ${tableName} CASCADE;`);

    for(const data of booksData){
        const sqlQuery = `INSERT INTO ${tableName} (id,title,author_id,category_id,description,img) VALUES ($1,$2,$3,$4,$5,$6);`;
        const values = [data.id,data.title,data.author,data.category,data.description,data.img];
        await client.query(sqlQuery,values);
        console.log(sqlQuery);
    }    
};

//2. importer les utilisateurs
async function insertUsers(){
    const tableName = "users";

    await client.query(`TRUNCATE ${tableName} CASCADE;`);

    for(const data of usersData){
        const sqlQuery = `INSERT INTO ${tableName} (pseudo,email,password) VALUES ($1,$2,$3);`;
        const values = [data.pseudo, data.email, data.password];
        await client.query(sqlQuery,values);
        console.log(sqlQuery);
    }    
};


//3. importer les auteurs
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


//4. importer les categories
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
