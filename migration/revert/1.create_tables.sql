-- Revert read-or-not:1.create_tables from pg

BEGIN;

DROP TABLE user,category,author,book,library CASCADE;

COMMIT;
