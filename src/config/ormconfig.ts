import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + './../.env' });

const isDevMode = process.env.NODE_ENV === 'production' ? false : true;
const extraSsl = isDevMode
  ? {}
  : {
      ssl: {
        rejectUnauthorized: false,
      },
    };
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
