import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

import City from '../models/City';
import Citizen from '../models/Citizen';

dotenv.config();

const seed = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to MongoDB');

        const cities = JSON.parse(fs.readFileSync('./src/seed/cities.json', 'utf-8'));
        const citizens = JSON.parse(fs.readFileSync('./src/seed/citizens.json', 'utf-8'));

        await City.deleteMany({});
        await Citizen.deleteMany({});

        await City.insertMany(cities);
        await Citizen.insertMany(citizens);

        console.log('Seed completed!');
        process.exit();
    } 
  
    catch (e) {
        console.error('Seed failed:', e);
        process.exit(1);    
    }
};

seed();