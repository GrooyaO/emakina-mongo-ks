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

    const insertResult = await collection.insertOne({
      name: 'Nebojsa Jakovljevic',
      role: 'Software developer',
      employed: new Date(Date.parse('2020-04-01')),
      languages: ['javascript', 'python', 'ruby', 'php'],
      createdAt: new Date(),
    });

    if (insertResult.result.ok) {
      console.log('👌');
      console.log(
        `insertedCount:\t${insertResult.insertedCount}\ninsertedId:\t${insertResult.insertedId}`
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
