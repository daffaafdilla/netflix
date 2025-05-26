import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Movie } from '../../types';
import { getGenreNames } from '../../services/movieService';

interface BannerProps {
  movie: Movie;
}

const Banner = ({ movie }: BannerProps) => {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  
  // Truncate the description if it's too long
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  // Get genre names for display
  const genreNames = getGenreNames(movie.genre_ids);
  const genreText = genreNames.join(' • ');

  // Reset trailer when movie changes
  useEffect(() => {
    setIsTrailerPlaying(false);
  }, [movie]);

  return (
    <header 
      className="relative text-white h-[80vh] object-cover object-center"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(to bottom, transparent 60%, rgba(20, 20, 20, 0.8) 85%, #141414 100%), 
                           url(${movie.backdrop_path})`,
        backgroundPosition: 'center top'
      }}
    >
      {isTrailerPlaying && movie.trailerUrl && (
        <div className="absolute inset-0 bg-black/90 z-10 flex items-center justify-center">
          <div className="w-full max-w-4xl px-4">
            <div className="relative pb-[56.25%]">
              <video
                className="absolute top-0 left-0 w-full h-full"
                src={movie.trailerUrl}
                controls
                autoPlay
              />
            </div>
            <button 
              onClick={() => setIsTrailerPlaying(false)}
              className="mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-end h-full pb-20 pt-40 px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-shadow-lg">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-green-500 font-semibold">{movie.vote_average.toFixed(1)} Rating</span>
            <span>{movie.release_date.split('-')[0]}</span>
            {genreText && <span className="text-gray-300">{genreText}</span>}
          </div>
          
          <p className="text-gray-300 text-sm md:text-base max-w-lg">
            {truncate(movie.overview, 200)}
          </p>
          
          <div className="flex space-x-3 mt-4">
            <button 
              className="flex items-center bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300 transition"
              onClick={() => setIsTrailerPlaying(true)}
            >
              <Play className="mr-2" size={20} />
              Play
            </button>
            
            <Link 
              to={`/movie/${movie.id}`}
              className="flex items-center bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              <Info className="mr-2" size={20} />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;