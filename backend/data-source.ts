import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/entities/user.entity';
import { Address } from './src/entities/address.entity';
import { Product } from './src/entities/product.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'riskistore',
  entities: [User, Address, Product],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false,
  logging: true,
});
