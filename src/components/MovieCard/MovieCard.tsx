import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Check, Info } from 'lucide-react';
import { Movie } from '../../types';
import { useFavorites } from '../../contexts/FavoritesContext';
import { getGenreNames } from '../../services/movieService';

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
}

const MovieCard = ({ movie, isLarge = false }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);
  
  // Get first two genres
  const genreNames = getGenreNames(movie.genre_ids).slice(0, 2);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className={`relative inline-block rounded-md overflow-hidden transition-transform duration-300 ${
        isLarge ? 'min-w-[240px] sm:min-w-[280px] md:min-w-[320px] h-[180px] sm:h-[200px] md:h-[220px]' : 
                 'min-w-[160px] sm:min-w-[180px] md:min-w-[200px] h-[240px] sm:h-[260px] md:h-[300px]'
      } ${isHovered ? 'transform scale-105 z-10 shadow-xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={isLarge ? movie.backdrop_path : movie.poster_path} 
        alt={movie.title}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-3">
          <h3 className="text-white font-bold text-sm md:text-base mb-1 line-clamp-1">{movie.title}</h3>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-green-500 text-xs font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400 text-xs">
              {movie.release_date.split('-')[0]}
            </span>
          </div>
          
          {genreNames.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {genreNames.map(genre => (
                <span key={genre} className="text-[10px] text-white bg-white/20 px-1.5 py-0.5 rounded">
                  {genre}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex space-x-2">
            <button 
              className="flex items-center justify-center bg-white text-black rounded-full w-8 h-8 hover:bg-gray-300 transition"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Play size={16} />
            </button>
            
            <button 
              className={`flex items-center justify-center rounded-full w-8 h-8 transition ${
                favorited ? 
                'bg-netflixRed text-white hover:bg-red-700' : 
                'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              onClick={handleToggleFavorite}
            >
              {favorited ? <Check size={16} /> : <Plus size={16} />}
            </button>
            
            <button 
              className="flex items-center justify-center bg-gray-700 text-white rounded-full w-8 h-8 hover:bg-gray-600 transition ml-auto"
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      )}
    </Link>
  );
};

export default MovieCard;