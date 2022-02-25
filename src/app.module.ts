import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelModule } from '@/modules/level.module';
import { DeveloperModule } from './modules/developer.module';

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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
