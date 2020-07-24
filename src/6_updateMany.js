const { MongoClient } = require('mongodb');

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'emakinaks';
const DB_COLLECTION = 'employees';

(async () => {
  try {
    const client = await MongoClient.connect(DB_URL, {
      useUnifiedTopology: true,
    });
    const db = client.db(DB_NAME);
    const collection = db.collection(DB_COLLECTION);

    const updateOneResult = await collection.updateMany(
      { role: 'Software developer' },
      {
        $push: { languages: 'javascript' },
      }
    );

    console.log(updateOneResult.result);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
