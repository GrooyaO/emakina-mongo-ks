const { MongoClient } = require('mongodb');

const DB_URL = 'mongodb://localhost:27017/emakina-ks';

(async () => {
  try {
    const db = await MongoClient.connect(DB_URL, {
      useUnifiedTopology: true,
      // poolSize: 10, // default 5
      // ssl: true, // default false
      // w: 1, // default: 1 (options: "majority", 0 .. n)
    });

    console.dir(db);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
