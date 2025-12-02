require('dotenv').config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  dir: 'migrations',            // folder where migrations are stored
  migrationsTable: 'pgmigrations', // table to track applied migrations
};
