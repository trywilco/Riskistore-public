import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { Product } from '../entities/product.entity';
import { seedProducts } from './product-seed';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'riskistore',
  entities: [User, Address, Product],
  synchronize: false,
  logging: true,
});

async function runSeed() {
  try {
    await dataSource.initialize();
    await seedProducts(dataSource);
    await dataSource.destroy();
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();
