-- Deploy read-or-not:1.create_tables to pg

BEGIN;


CREATE DOMAIN valid_mail AS text CHECK( 
    VALUE ~  '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE,
    email valid_mail NOT NULL UNIQUE,
    password text NOT NULL UNIQUE
);

CREATE TABLE category (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE
);

CREATE TABLE author (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL UNIQUE,
    lastname text NOT NULL UNIQUE
);

CREATE TABLE book (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL UNIQUE,
    author_id int NOT NULL REFERENCES author(id),
    category_id int NOT NULL REFERENCES category(id),
    description text NOT NULL 
);

CREATE TABLE "library" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id int NOT NULL UNIQUE REFERENCES "user"(id),
    book_id int NOT NULL UNIQUE REFERENCES book(id),
    readornot BOOLEAN NOT NULL,
    "comment" text,
    note text
);
COMMIT;
