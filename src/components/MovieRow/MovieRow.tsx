import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../MovieCard/MovieCard';
import { Movie } from '../../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLargeRow?: boolean;
}

const MovieRow = ({ title, movies, isLargeRow = false }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    setIsScrolling(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
      
      // Reset scrolling state after animation completes
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      
      // Show left arrow if we've scrolled right
      setShowLeftArrow(scrollLeft > 0);
      
      // Show right arrow if we haven't reached the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-2 md:mb-4 ml-4 md:ml-8">
        {title}
      </h2>
      
      <div className="relative group">
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 text-white hover:bg-black/80 px-1 md:px-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            onClick={() => scroll('left')}
            disabled={isScrolling || !showLeftArrow}
          >
            <ChevronLeft size={30} />
          </button>
        )}
        
        <div 
          className="flex items-start overflow-x-scroll scrollbar-hide px-4 md:px-8 py-2 scroll-smooth"
          ref={rowRef}
          onScroll={handleScroll}
        >
          {movies.map(movie => (
            <div key={movie.id} className={`mr-2 md:mr-4 ${isLargeRow ? 'flex-none' : 'flex-none'}`}>
              <MovieCard movie={movie} isLarge={isLargeRow} />
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 text-white hover:bg-black/80 px-1 md:px-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            onClick={() => scroll('right')}
            disabled={isScrolling || !showRightArrow}
          >
            <ChevronRight size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;