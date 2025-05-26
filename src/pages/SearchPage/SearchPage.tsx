import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/movieService';
import { Movie } from '../../types';
import MovieCard from '../../components/MovieCard/MovieCard';
import { Search as SearchIcon } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (query) {
        const searchResults = searchMovies(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
      
      setIsLoading(false);
    };
    
    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen bg-netflixBlack pt-24 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
          {query ? `Search results for "${query}"` : 'Browse all titles'}
        </h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-netflixRed border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
            {results.map(movie => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900/50 rounded-lg p-8 text-center mt-8">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <SearchIcon size={32} className="text-gray-400" />
            </div>
            <h2 className="text-white text-xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-400">
              {query ? 
                `We couldn't find any matches for "${query}". Try different keywords or browse categories.` : 
                'Start searching for movies and TV shows.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;