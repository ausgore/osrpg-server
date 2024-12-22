import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { MySqlDriver, Options } from '@mikro-orm/mysql';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV });

const config: Options = {
  driver: MySqlDriver,
  extensions: [SeedManager, Migrator],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
};

export default config;