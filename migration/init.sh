# je prends l'identité de spedata
export PGUSER=spedata

# je supprime la BDD
dropdb readornot

# je supprime l'utilisateur
dropuser admin_readornot

# je veux lancer le script
psql -f init_db.sql -d postgres

# j'initialise SQITCH
sqitch init readornot --engine pg --target db:pg:readornot