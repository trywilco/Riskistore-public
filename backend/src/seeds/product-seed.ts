import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';

const productSeedData = [
  // Electronics
  {
    name: 'Wireless Noise-Canceling Headphones',
    price: Number(249.99),
    description: 'Premium over-ear headphones with advanced noise-canceling technology, 40-hour battery life, and crystal-clear sound quality.',
    imageUrl: 'https://m.media-amazon.com/images/I/61-PblYM7VL._AC_SL1500_.jpg'
  },
  {
    name: '4K Smart LED Television',
    price: Number(599.99),
    description: '65-inch Ultra HD Smart TV with HDR, Dolby Vision, and built-in streaming apps for an immersive viewing experience.',
    imageUrl: 'https://m.media-amazon.com/images/I/71Swqqe7dSL._AC_SL1500_.jpg'
  },
  {
    name: 'Smartphone Pro Max',
    price: Number(1099.99),
    description: 'Latest flagship smartphone with triple-lens camera, 5G connectivity, and 256GB storage.',
    imageUrl: 'https://m.media-amazon.com/images/I/61-mZzksLLL._AC_SL1500_.jpg'
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: Number(129.99),
    description: 'Waterproof wireless speaker with 360-degree sound, 12-hour battery life, and multiple color options.',
    imageUrl: 'https://m.media-amazon.com/images/I/61dDQrS6NHL._AC_SL1500_.jpg'
  },
  {
    name: 'Wireless Charging Pad',
    price: Number(49.99),
    description: 'Fast-charging wireless pad compatible with multiple devices, with LED indicators and non-slip surface.',
    imageUrl: 'https://m.media-amazon.com/images/I/61-Xt3-WDFL._AC_SL1500_.jpg'
  },

  // Home & Kitchen
  {
    name: 'Stainless Steel Air Fryer',
    price: Number(129.99),
    description: '5.8-quart digital air fryer with touchscreen controls, multiple cooking presets, and dishwasher-safe parts.',
    imageUrl: 'https://m.media-amazon.com/images/I/71Q1tPupKPL._AC_SL1500_.jpg'
  },
  {
    name: 'Coffee Maker with Grinder',
    price: Number(199.99),
    description: 'Integrated burr grinder, programmable timer, and brew strength control for the perfect morning coffee.',
    imageUrl: 'https://m.media-amazon.com/images/I/71QaGU-oCOL._AC_SL1500_.jpg'
  },
  {
    name: 'Robot Vacuum Cleaner',
    price: Number(279.99),
    description: 'Smart robotic vacuum with mapping technology, app control, and automatic charging dock.',
    imageUrl: 'https://m.media-amazon.com/images/I/61XA2BIpTEL._AC_SL1500_.jpg'
  },
  {
    name: 'Instant Pot Multi-Cooker',
    price: Number(99.99),
    description: '7-in-1 programmable pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.',
    imageUrl: 'https://m.media-amazon.com/images/I/71DSTmCPHkL._AC_SL1500_.jpg'
  },
  {
    name: 'Electric Kettle',
    price: Number(59.99),
    description: 'Quick-boil electric kettle with temperature control, auto-shutoff, and sleek stainless steel design.',
    imageUrl: 'https://m.media-amazon.com/images/I/61zUJ9iP-GL._AC_SL1500_.jpg'
  },

  // Fashion & Accessories
  {
    name: 'Leather Messenger Bag',
    price: Number(189.99),
    description: 'Genuine leather messenger bag with padded laptop compartment, multiple pockets, and adjustable strap.',
    imageUrl: 'https://m.media-amazon.com/images/I/61CqYq+QZPL._AC_SL1500_.jpg'
  },
  {
    name: 'Smartwatch Fitness Tracker',
    price: Number(179.99),
    description: 'Advanced fitness smartwatch with heart rate monitor, GPS tracking, sleep analysis, and smartphone notifications.',
    imageUrl: 'https://m.media-amazon.com/images/I/61hS-OgOVBL._AC_SL1500_.jpg'
  },
  {
    name: 'Wireless Noise-Canceling Earbuds',
    price: Number(199.99),
    description: 'True wireless earbuds with active noise cancellation, touch controls, and 8-hour battery life.',
    imageUrl: 'https://m.media-amazon.com/images/I/61nuNqKqEeL._AC_SL1500_.jpg'
  },
  {
    name: 'Designer Sunglasses',
    price: Number(249.99),
    description: 'Polarized sunglasses with UV protection, lightweight frame, and classic design.',
    imageUrl: 'https://m.media-amazon.com/images/I/61tE7IcuLzL._AC_SL1500_.jpg'
  },
  {
    name: 'Leather Wallet',
    price: Number(89.99),
    description: 'Slim RFID-blocking leather wallet with multiple card slots and minimalist design.',
    imageUrl: 'https://m.media-amazon.com/images/I/61VuPpqjJIL._AC_SL1500_.jpg'
  },

  // Sports & Outdoors
  {
    name: 'Yoga Mat Set',
    price: Number(69.99),
    description: 'Premium eco-friendly yoga mat with carrying strap, alignment markers, and extra thick cushioning.',
    imageUrl: 'https://m.media-amazon.com/images/I/71fZ7esQLML._AC_SL1500_.jpg'
  },
  {
    name: 'Fitness Resistance Bands',
    price: Number(29.99),
    description: 'Set of 5 resistance bands with different tension levels, ideal for home and gym workouts.',
    imageUrl: 'https://m.media-amazon.com/images/I/71wFhVw6AFL._AC_SL1500_.jpg'
  },
  {
    name: 'Hiking Backpack',
    price: Number(129.99),
    description: 'Waterproof 40L hiking backpack with multiple compartments, hydration bladder compatibility, and ergonomic design.',
    imageUrl: 'https://m.media-amazon.com/images/I/81RvUVUQVSL._AC_SL1500_.jpg'
  },
  {
    name: 'Wireless Bluetooth Earphones',
    price: Number(79.99),
    description: 'Sports wireless earphones with secure ear hooks, sweatproof design, and 10-hour battery life.',
    imageUrl: 'https://m.media-amazon.com/images/I/61-mZzksLLL._AC_SL1500_.jpg'
  },
  {
    name: 'Foam Roller',
    price: Number(39.99),
    description: 'High-density foam roller for muscle recovery, deep tissue massage, and physical therapy.',
    imageUrl: 'https://m.media-amazon.com/images/I/71VaQ3TgfEL._AC_SL1500_.jpg'
  }
];

export async function seedProducts(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(Product);
  
  try {
    // Clear existing products
    await productRepository.clear();
    await productRepository.save(productSeedData);
    console.log('Successfully seeded products!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
