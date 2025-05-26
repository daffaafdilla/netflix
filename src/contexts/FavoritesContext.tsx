import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { FavoritesContextType, Movie } from '../types';
import { useAuth } from './AuthContext';

// Create the FavoritesContext
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Custom hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { currentUser } = useAuth();

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      const storedFavorites = localStorage.getItem(`favorites-${currentUser.id}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } else {
      // Clear favorites when user logs out
      setFavorites([]);
    }
  }, [currentUser]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (currentUser && favorites.length > 0) {
      localStorage.setItem(`favorites-${currentUser.id}`, JSON.stringify(favorites));
    }
  }, [favorites, currentUser]);

  // Add a movie to favorites
  const addToFavorites = (movie: Movie) => {
    // Prevent duplicates
    if (!favorites.some(item => item.id === movie.id)) {
      setFavorites(prev => [...prev, movie]);
    }
  };

  // Remove a movie from favorites
  const removeFromFavorites = (movieId: number) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};