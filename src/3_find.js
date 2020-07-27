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

    const oneResult = await collection.findOne({ albumId: 10 });
    console.log('### findOne result 🔍');
    console.log(oneResult);

    const manyResult = collection.find({ photoId: { $gt: 1000 } }); // returns cursor

    // sort, skip, limit, get array of results
    console.log('### findMany result 🔍');
    const smallResult = await manyResult
      .sort({ photoId: -1 })
      .skip(100)
      .limit(5)
      .toArray();
    smallResult.forEach((photo) => console.log(photo));
    console.log(`### Count results: ${await manyResult.count()}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
