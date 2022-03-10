import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelModule } from '@/modules/level.module';
import { DeveloperModule } from './modules/developer.module';
import { dbConfig } from '@/config/dbconfig'

const isDevMode = process.env.NODE_ENV === 'production' ? false : true;
const extraSsl = isDevMode
  ? {}
  : {
      ssl: {
        rejectUnauthorized: false,
      },
    };
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConfig.host,
      port: parseInt(dbConfig.port),
      username: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      autoLoadEntities: true,
      migrationsRun: true,
      ssl: !isDevMode,
      extra: extraSsl,
    }),
    LevelModule,
    DeveloperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
