import * as PostgressConnectionStringParser from "pg-connection-string";
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + './../.env' });

const dbUrl = process.env.DATABASE_URL;
export const dbConfig = dbUrl 
  ? PostgressConnectionStringParser.parse(dbUrl)
  : {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  };