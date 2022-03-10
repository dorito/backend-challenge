import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as PostgressConnectionStringParser from "pg-connection-string";
dotenv.config({ path: __dirname + './../.env' });

const isDevMode = process.env.NODE_ENV === 'production' ? false : true;
const extraSsl = isDevMode
  ? {}
  : {
      ssl: {
        rejectUnauthorized: false,
      },
    };
const dbUrl = process.env.DATABASE_URL;
const dbConfig = dbUrl 
  ? PostgressConnectionStringParser.parse(dbUrl)
  : {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  };
const config: ConnectionOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: parseInt(dbConfig.port),
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  ssl: !isDevMode,
  extra: extraSsl,

  synchronize: false,

  migrationsRun: true,
  logging: false,
  logger: 'file',

  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
};

export = config;
