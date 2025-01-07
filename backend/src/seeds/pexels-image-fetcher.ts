import axios from 'axios';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';

dotenv.config();

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Array<{
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: {
      original: string;
      large2x: string;
      large: string;
      medium: string;
      small: string;
      portrait: string;
      landscape: string;
      tiny: string;
    };
    liked: boolean;
    alt: string;
  }>;
}

const PRODUCT_SEARCH_TERMS: { [key: string]: string } = {
  'Wireless Noise-Canceling Headphones': 'headphones',
  '4K Smart LED Television': 'tv',
  'Smartphone Pro Max': 'smartphone',
  'Portable Bluetooth Speaker': 'speaker',
  'Wireless Charging Pad': 'charger',
  'Stainless Steel Air Fryer': 'fryer',
  'Coffee Maker with Grinder': 'coffeemaker',
  'Robot Vacuum Cleaner': 'vacuum',
  'Instant Pot Multi-Cooker': 'cooker',
  'Electric Kettle': 'kettle',
  'Leather Messenger Bag': 'bag',
  'Smartwatch Fitness Tracker': 'smartwatch',
  'Wireless Noise-Canceling Earbuds': 'earbuds',
  'Designer Sunglasses': 'sunglasses',
  'Leather Wallet': 'wallet',
  'Yoga Mat Set': 'yogamat',
  'Fitness Resistance Bands': 'resistancebands',
  'Hiking Backpack': 'backpack',
  'Wireless Bluetooth Earphones': 'earphones',
  'Foam Roller': 'foamroller'
};

async function fetchProductImages(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(Product);
  const products = await productRepository.find();

  const updatedProducts = [];

  for (const product of products) {
    try {
      const searchTerm = PRODUCT_SEARCH_TERMS[product.name] || product.name.split(' ')[0].toLowerCase();
      console.log(`Fetching image for ${product.name} with search term: ${searchTerm}`);
      
      const response = await axios.get<PexelsSearchResponse>(`https://api.pexels.com/v1/search`, {
        params: {
          query: searchTerm,
          per_page: 1,
        },
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      });

      if (response.data.photos.length > 0) {
        const imageUrl = response.data.photos[0].src.large2x;
        product.imageUrl = imageUrl;
        updatedProducts.push(product);
        console.log(`Found image for ${product.name}: ${imageUrl}`);
      } else {
        console.log(`No image found for ${product.name}`);
      }
    } catch (error) {
      console.error(`Error fetching image for ${product.name}:`, error);
    }
  }

  // Save updated products
  await productRepository.save(updatedProducts);
  console.log(`Updated ${updatedProducts.length} product images`);
}

export async function updateProductImagesFromPexels() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'riskistore',
    entities: [Product],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    await fetchProductImages(dataSource);
  } catch (error) {
    console.error('Error updating product images:', error);
  } finally {
    await dataSource.destroy();
  }
}

updateProductImagesFromPexels();
