const { MongoClient } = require('mongodb');

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'emakinaks';
const DB_COLLECTION = 'movies';

(async () => {
  try {
    const client = await MongoClient.connect(DB_URL, {
      useUnifiedTopology: true,
    });
    const db = client.db(DB_NAME);
    const collection = db.collection(DB_COLLECTION);

    console.log('##### Top 10 before 1990 🍿 🎥 #####');
    const moviesAfter2000 = collection.find({
      year: { $lt: 1990 },
      'imdb.votes': { $gte: 5000 },
    });

    console.log(`Count: ${await moviesAfter2000.count()}`);
    const moviesAfter2000Top10 = await moviesAfter2000
      .sort({ 'imdb.rating': -1 })
      .limit(10)
      .toArray();
    console.table(
      moviesAfter2000Top10.map((movie) => {
        return {
          title: movie.title,
          genres: movie.genres.join(' | '),
          year: movie.year,
          rating: movie.imdb.rating,
        };
      })
    );

    // Marlon Brando movies
    console.log('##### Marlon Brando movies 🍿 🎥 #####');
    const MBMovies = collection.find({
      cast: 'Marlon Brando',
    });
    console.log(`Count: ${await MBMovies.count()}`);
    const MBMoviesTop10 = await MBMovies.sort({ 'imdb.rating': -1 })
      .limit(10)
      .toArray();
    console.table(
      MBMoviesTop10.map((movie) => {
        return {
          title: movie.title,
          cast: movie.cast.join(' | '),
          year: movie.year,
          rating: movie.imdb.rating,
        };
      })
    );

    // Al Pacino and/or Marlon Brando movies
    console.log('##### Al Pacino and/or Marlon Brando movies 🍿 🎥 #####');
    const APMBMovies = collection.find({
      $and: [
        {
          cast: 'Marlon Brando',
        },
        {
          cast: 'Al Pacino',
        },
      ],
    });
    console.log(`Count: ${await APMBMovies.count()}`);
    const APMBTop = await APMBMovies.sort({ 'imdb.rating': -1 })
      .limit(10)
      .toArray();
    console.table(
      APMBTop.map((movie) => {
        return {
          title: movie.title,
          cast: movie.cast.join(', '),
          year: movie.year,
          rating: movie.imdb.rating,
        };
      })
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
