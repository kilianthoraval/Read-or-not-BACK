-- je crèe un rôle pour gérer la BDD
CREATE ROLE admin_readornot WITH LOGIN PASSWORD 'readornot';

-- je crèe la BDD
CREATE DATABASE readornot OWNER admin_readornot;