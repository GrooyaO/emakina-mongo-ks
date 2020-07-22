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

    // reset data
    collection.drop();

    const manager = {
      name: 'Dejan Ostojic',
      role: 'CTO',
      employed: new Date(Date.parse('2018-04-18')),
      createdAt: new Date(),
    };
    const employees = [
      {
        name: 'Nebojsa Jakovljevic',
        role: 'Software developer',
        employed: new Date(Date.parse('2020-04-01')),
        languages: ['javascript', 'python', 'ruby', 'php'],
        createdAt: new Date(),
      },
      {
        name: 'Miroslav Pavlovic',
        role: 'Software developer',
        employed: new Date(Date.parse('2019-05-01')),
        languages: ['javascript', 'java', 'sql'],
        createdAt: new Date(),
      },
    ];

    // insert employees
    await collection.insertMany(employees);

    const result = await collection.bulkWrite([
      {
        insertOne: { document: { ...manager } },
      },
      {
        updateOne: {
          filter: { name: 'Zagar Milos' },
          update: {
            $set: { name: 'Milos Zagar', role: 'COO' },
          },
          upsert: true,
        },
      },
      {
        updateMany: {
          filter: { role: 'Software developer' },
          update: {
            $set: { updatedAt: new Date() },
          },
        },
      },
    ]);

    console.log(result);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
