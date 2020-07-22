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
      {
        name: 'Dejan Ostojic',
        role: 'CTO',
        employed: new Date(Date.parse('2018-04-18')),
        createdAt: new Date(),
      },
    ];

    const result = await collection.insertMany(employees);

    console.log(`insertedCount:\t${result.insertedCount}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
