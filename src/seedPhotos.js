const fs = require('fs').promises;
const path = require('path');
const { MongoClient } = require('mongodb');

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'emakinaks';
const DB_COLLECTION = 'photos';

(async () => {
  try {
    const client = await MongoClient.connect(DB_URL, {
      useUnifiedTopology: true,
    });
    const db = client.db(DB_NAME);
    const collection = db.collection(DB_COLLECTION);

    // read seed data from json file
    const photosJSON = await fs.readFile(
      path.join(__dirname, '../data/photos.json'),
      'utf-8'
    );
    const photosArray = JSON.parse(photosJSON);

    // insert data
    const result = await collection.insertMany(photosArray);

    console.dir(`Number of inserted documents: ${result.insertedCount} 🧮`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
