import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + './../.env' });

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [__dirname + '/entities/*{.ts,.js}'],

  synchronize: false,

  migrationsRun: true,
  logging: true,
  logger: 'file',

  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
};

export = config;
