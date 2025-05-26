import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, Check, ChevronLeft } from 'lucide-react';
import { getMovieById, getGenreNames } from '../../services/movieService';
import { Movie } from '../../types';
import { useFavorites } from '../../contexts/FavoritesContext';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import MovieRow from '../../components/MovieRow/MovieRow';
import { getMoviesByCategory } from '../../services/movieService';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadMovie = async () => {
      setIsLoading(true);
      // Scroll to top when movie changes
      window.scrollTo(0, 0);
      
      if (id) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const movieId = parseInt(id);
        const movieData = getMovieById(movieId);
        
        if (movieData) {
          setMovie(movieData);
          
          // Get movies from the same genres
          if (movieData.genre_ids.length > 0) {
            const primaryGenreId = movieData.genre_ids[0];
            const genreMovies = getMoviesByCategory('top rated').filter(
              m => m.id !== movieId && m.genre_ids.includes(primaryGenreId)
            );
            setSimilarMovies(genreMovies);
          }
        }
      }
      
      setIsLoading(false);
    };
    
    loadMovie();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    if (!movie) return;
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (isLoading || !movie) {
    return (
      <div className="min-h-screen bg-netflixBlack flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-netflixRed border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const genreNames = getGenreNames(movie.genre_ids);
  const isFavorited = isFavorite(movie.id);

  return (
    <div className="bg-netflixBlack min-h-screen pt-16">
      {/* Movie Header/Hero */}
      <div 
        className="relative h-[50vh] md:h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0.2), rgba(20, 20, 20, 0.8) 90%, #141414 100%), 
                           url(${movie.backdrop_path})`
        }}
      >
        <button 
          onClick={handleGoBack}
          className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
          <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-end md:items-center">
            <img 
              src={movie.poster_path} 
              alt={movie.title}
              className="hidden md:block w-40 md:w-48 lg:w-56 h-auto rounded-md shadow-lg mr-8"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-300 space-x-4 mb-4">
                <span className="text-green-500 font-semibold">{movie.vote_average.toFixed(1)} Rating</span>
                <span>{movie.release_date.split('-')[0]}</span>
                <span>{genreNames.join(', ')}</span>
              </div>
              
              <div className="flex space-x-3 mb-4">
                <button 
                  className="flex items-center bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300 transition"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="mr-2" size={20} />
                  Play
                </button>
                
                <button 
                  className={`flex items-center px-6 py-2 rounded-md transition ${
                    isFavorited ? 
                    'bg-netflixRed text-white hover:bg-red-700' : 
                    'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                  onClick={handleToggleFavorite}
                >
                  {isFavorited ? <Check className="mr-2" size={20} /> : <Plus className="mr-2" size={20} />}
                  {isFavorited ? 'Added to My List' : 'Add to My List'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie Details */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 pr-0 md:pr-8">
            <h3 className="text-white text-xl font-semibold mb-3">Overview</h3>
            <p className="text-gray-300 mb-6">{movie.overview}</p>
          </div>
          
          <div className="md:w-1/3 bg-gray-900/50 p-4 rounded-md">
            <div className="mb-4">
              <h4 className="text-gray-400 text-sm">Release Date</h4>
              <p className="text-white">{movie.release_date}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-gray-400 text-sm">Rating</h4>
              <p className="text-white">{movie.vote_average.toFixed(1)} / 10</p>
            </div>
            
            <div>
              <h4 className="text-gray-400 text-sm">Genres</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {genreNames.map(genre => (
                  <span key={genre} className="text-xs text-white bg-gray-700 px-2 py-1 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="mt-8">
          <MovieRow title="More Like This" movies={similarMovies} />
        </div>
      )}
      
      {/* Fullscreen video player */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black z-50">
          <VideoPlayer 
            videoUrl={movie.trailerUrl || ''} 
            posterUrl={movie.backdrop_path}
            onClose={() => setIsPlaying(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;