import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + './../.env' });
import { dbConfig } from './dbconfig'

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
