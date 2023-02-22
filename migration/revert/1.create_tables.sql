-- Revert read-or-not:1.create_tables from pg

BEGIN;

DROP TABLE "users",category,author,book,"library" CASCADE;
DROP DOMAIN valid_mail;

COMMIT;
