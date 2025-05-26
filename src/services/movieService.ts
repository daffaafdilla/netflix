import { Movie, Genre } from '../types';

// Mock genres data
export const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

// Mock data with movie trailers
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_path: 'https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 8.8,
    release_date: '2010-07-16',
    genre_ids: [28, 878, 53],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster_path: 'https://images.pexels.com/photos/2837732/pexels-photo-2837732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 9.3,
    release_date: '1994-09-23',
    genre_ids: [18, 80],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster_path: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/2739013/pexels-photo-2739013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 9.0,
    release_date: '2008-07-18',
    genre_ids: [28, 80, 18],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    poster_path: 'https://images.pexels.com/photos/2425031/pexels-photo-2425031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 8.9,
    release_date: '1994-10-14',
    genre_ids: [53, 80],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 5,
    title: 'Forrest Gump',
    overview: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    poster_path: 'https://images.pexels.com/photos/1716157/pexels-photo-1716157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 8.8,
    release_date: '1994-07-06',
    genre_ids: [18, 35, 10749],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 6,
    title: 'The Matrix',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster_path: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 8.7,
    release_date: '1999-03-31',
    genre_ids: [28, 878],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 7,
    title: 'The Godfather',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster_path: 'https://images.pexels.com/photos/2398355/pexels-photo-2398355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/1212693/pexels-photo-1212693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 9.2,
    release_date: '1972-03-15',
    genre_ids: [18, 80],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 8,
    title: 'Fight Club',
    overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    poster_path: 'https://images.pexels.com/photos/3309865/pexels-photo-3309865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/2682639/pexels-photo-2682639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 8.8,
    release_date: '1999-10-15',
    genre_ids: [18, 53],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 9,
    title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster_path: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 8.6,
    release_date: '2014-11-05',
    genre_ids: [12, 18, 878],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 10,
    title: 'The Lord of the Rings: The Return of the King',
    overview: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    poster_path: 'https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 8.9,
    release_date: '2003-12-17',
    genre_ids: [12, 14, 28],
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 11,
    title: 'Stranger Things',
    overview: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    poster_path: 'https://images.pexels.com/photos/3356607/pexels-photo-3356607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/3910065/pexels-photo-3910065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 8.5,
    release_date: '2016-07-15',
    genre_ids: [18, 9648, 878],
    media_type: 'tv',
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 12,
    title: 'Breaking Bad',
    overview: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    poster_path: 'https://images.pexels.com/photos/57043/pexels-photo-57043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backdrop_path: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vote_average: 9.5,
    release_date: '2008-01-20',
    genre_ids: [18, 80],
    media_type: 'tv',
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }
];

// Get featured movie (random from top rated)
export const getFeaturedMovie = (): Movie => {
  const topRated = mockMovies.filter(movie => movie.vote_average >= 8.8);
  return topRated[Math.floor(Math.random() * topRated.length)];
};

// Get movies by category
export const getMoviesByCategory = (category: string): Movie[] => {
  switch (category.toLowerCase()) {
    case 'trending':
      return mockMovies.slice(0, 10).sort(() => 0.5 - Math.random());
    case 'top rated':
      return mockMovies.sort((a, b) => b.vote_average - a.vote_average).slice(0, 10);
    case 'action':
      return mockMovies.filter(movie => movie.genre_ids.includes(28));
    case 'comedy':
      return mockMovies.filter(movie => movie.genre_ids.includes(35));
    case 'drama':
      return mockMovies.filter(movie => movie.genre_ids.includes(18));
    case 'sci-fi':
      return mockMovies.filter(movie => movie.genre_ids.includes(878));
    case 'tv shows':
      return mockMovies.filter(movie => movie.media_type === 'tv');
    default:
      return mockMovies.slice(0, 8);
  }
};

// Get movie by ID
export const getMovieById = (id: number): Movie | undefined => {
  return mockMovies.find(movie => movie.id === id);
};

// Search movies
export const searchMovies = (query: string): Movie[] => {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  // Check if query is a genre
  const genreMatch = genres.find(genre => 
    genre.name.toLowerCase() === lowercaseQuery
  );
  
  if (genreMatch) {
    return mockMovies.filter(movie => movie.genre_ids.includes(genreMatch.id));
  }
  
  // Check if query is a media type
  if (lowercaseQuery === 'movies') {
    return mockMovies.filter(movie => movie.media_type !== 'tv');
  }
  
  if (lowercaseQuery === 'tv' || lowercaseQuery === 'tv shows') {
    return mockMovies.filter(movie => movie.media_type === 'tv');
  }
  
  // General search
  return mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(lowercaseQuery) || 
    movie.overview.toLowerCase().includes(lowercaseQuery)
  );
};

// Get genre names from genre ids
export const getGenreNames = (genreIds: number[]): string[] => {
  return genreIds.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : '';
  }).filter(name => name !== '');
};