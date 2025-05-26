import { useState, useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import MovieRow from '../../components/MovieRow/MovieRow';
import { getFeaturedMovie, getMoviesByCategory } from '../../services/movieService';
import { Movie } from '../../types';

const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [categories, setCategories] = useState<{title: string; movies: Movie[]}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API loading delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get featured movie
      const featured = getFeaturedMovie();
      setFeaturedMovie(featured);
      
      // Get categories with movies
      const categoryList = [
        { title: 'Trending Now', category: 'trending' },
        { title: 'Top Rated', category: 'top rated' },
        { title: 'Action Movies', category: 'action' },
        { title: 'Comedies', category: 'comedy' },
        { title: 'Dramas', category: 'drama' },
        { title: 'Sci-Fi', category: 'sci-fi' },
        { title: 'TV Shows', category: 'tv shows' }
      ];
      
      const categoryData = categoryList.map(item => ({
        title: item.title,
        movies: getMoviesByCategory(item.category)
      }));
      
      setCategories(categoryData);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  if (isLoading || !featuredMovie) {
    return (
      <div className="min-h-screen bg-netflixBlack flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-netflixRed border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-netflixBlack min-h-screen">
      <Banner movie={featuredMovie} />
      
      <div className="relative z-10 mt-[-100px]">
        {categories.map((category, index) => (
          <MovieRow 
            key={category.title}
            title={category.title}
            movies={category.movies}
            isLargeRow={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;