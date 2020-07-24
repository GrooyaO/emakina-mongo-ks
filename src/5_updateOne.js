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
        name: 'Bora Jekic',
      },
      {
        $set: { name: 'Borislav Jekic', updatedAt: new Date() },
        // $unset: { fieldToRemove: '' }
        // $pull: { languages: 'html' },
        // $inc: { counter: 1 } // any number
        // $mul: { someNumber: 3 }
        // $min: { lowTemperature: 15 }
        // $max: { highTemperature: 35 }
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
