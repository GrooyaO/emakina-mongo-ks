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

    const updateOneResult = await collection.updateOne(
      {
        name: 'M Zagar',
      },
      {
        $set: {
          name: 'Milos Zagar',
          updatedAt: new Date(),
          role: 'COO',
          employed: new Date(Date.parse('2018-01-01')),
        },
        $push: {
          languages: { $each: ['java', 'javascript'] },
          // $slice, $sort, $position
        },
        // $addToSet
        // $pop
      },
      {
        upsert: true,
        w: 1,
        j: true,
        wtimeout: 3000,
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
