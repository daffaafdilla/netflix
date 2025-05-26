import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import MovieCard from '../../components/MovieCard/MovieCard';
import { X } from 'lucide-react';

const FavoritesPage = () => {
  const { currentUser } = useAuth();
  const { favorites, removeFromFavorites } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFavorite = (movieId: number) => {
    removeFromFavorites(movieId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflixBlack flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-netflixRed border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflixBlack pt-24 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">My List</h1>
        <p className="text-gray-400 mb-8">
          {currentUser?.displayName ? `${currentUser.displayName}'s` : 'Your'} favorite movies and shows
        </p>
        
        {favorites.length === 0 ? (
          <div className="bg-gray-900/50 rounded-lg p-8 text-center">
            <h2 className="text-white text-xl font-semibold mb-4">Your list is empty</h2>
            <p className="text-gray-400 mb-6">Add movies and shows to your list to keep track of what you want to watch.</p>
            <Link 
              to="/"
              className="inline-block bg-netflixRed text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Browse content
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {favorites.map(movie => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                <button
                  onClick={() => handleRemoveFavorite(movie.id)}
                  className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;