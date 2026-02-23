require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Data = require('../models/Data');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Read JSON file
    const jsonPath = path.join(__dirname, '../../jsondata.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('jsondata.json not found! Please place it in the root directory.');
      process.exit(1);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    // Clean empty values
    const cleanedData = jsonData.map(item => {
      const cleaned = {};
      for (const key in item) {
        if (item[key] !== '' && item[key] !== null && item[key] !== undefined) {
          cleaned[key] = item[key];
        }
      }
      return cleaned;
    });

    // Delete existing data
    await Data.deleteMany({});
    console.log('Existing data deleted');

    // Insert new data
    await Data.insertMany(cleanedData);
    console.log(`${cleanedData.length} records imported successfully`);

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
