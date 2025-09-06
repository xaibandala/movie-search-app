import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import LoadingSpinner from './components/LoadingSpinner';

// Replace with your OMDb API key (get one from http://www.omdbapi.com/apikey.aspx)
const API_KEY = '1845392c'; // You should move this to an environment variable in production

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    setMovies([]);
    setSelectedMovie(null);
    
    try {
      // Search for multiple movies
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=${API_KEY}`
      );
      
      if (response.data.Response === 'True') {
        setMovies(response.data.Search || []);
      } else {
        setError('No movies found. Please try a different search term.');
      }
    } catch (err) {
      console.error('Error fetching movie data:', err);
      setError('Failed to fetch movie data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const selectMovie = async (movieId) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${API_KEY}`
      );
      
      if (response.data.Response === 'True') {
        setSelectedMovie(response.data);
      } else {
        setError('Failed to load movie details.');
      }
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Failed to fetch movie details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      // Load some popular movies for the landing page
      const popularSearches = ['Marvel', 'Batman', 'Star Wars'];
      const randomSearch = popularSearches[Math.floor(Math.random() * popularSearches.length)];
      await searchMovies(randomSearch);
    } catch (err) {
      console.error('Error loading popular movies:', err);
    }
  };

  // Load popular movies on initial load
  useEffect(() => {
    loadPopularMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Movie Search
          </h1>
          <p className="text-gray-400">Search for any movie and get detailed information</p>
        </header>

        <main className="max-w-7xl mx-auto">
          <SearchBar onSearch={searchMovies} />
          
          {selectedMovie && (
            <div className="mb-8">
              <button 
                onClick={() => setSelectedMovie(null)}
                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                ← Back to Results
              </button>
              <MovieCard movie={selectedMovie} />
            </div>
          )}
          
          {!selectedMovie && (
            <>
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <div className="text-center py-10">
                  <div className="inline-block p-4 bg-red-900/50 border border-red-700 rounded-lg">
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              ) : movies.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Movies</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                      <div
                        key={movie.imdbID}
                        onClick={() => selectMovie(movie.imdbID)}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:bg-gray-750"
                      >
                        {movie.Poster !== 'N/A' ? (
                          <img 
                            className="h-80 w-full object-cover" 
                            src={movie.Poster} 
                            alt={movie.Title}
                          />
                        ) : (
                          <div className="h-80 w-full bg-gray-700 flex items-center justify-center">
                            <div className="text-gray-500 text-5xl">🎬</div>
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-1 truncate" title={movie.Title}>
                            {movie.Title}
                          </h3>
                          <p className="text-gray-400 text-sm">{movie.Year}</p>
                          <p className="text-gray-500 text-xs mt-1 capitalize">{movie.Type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <p className="text-gray-400">Click on any movie to see detailed information</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  Search for movies to see results
                </div>
              )}
            </>
          )}
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Powered by <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OMDb API</a></p>
          <p className="mt-2">Data provided by OMDb. © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
