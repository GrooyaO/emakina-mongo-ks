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

    const photoIdToDelte = Math.floor(Math.random() * (5000 - 2) + 1);

    console.log(`Deleting photoId: ${photoIdToDelte}`)
    const deleteResult = await collection.deleteOne( { photoId: photoIdToDelte });

    console.log(deleteResult.result);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
