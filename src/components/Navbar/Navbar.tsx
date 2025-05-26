import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Add scroll event listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled || showMobileMenu ? 'bg-netflixBlack shadow-md' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-netflixRed font-bold text-2xl tracking-wider">NETFLIX</div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/search?q=movies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Movies
            </Link>
            <Link to="/search?q=tv" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              TV Shows
            </Link>
            {currentUser && (
              <Link to="/favorites" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                My List
              </Link>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center">
            {/* Search bar */}
            <div className="relative mr-2">
              {showSearch ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-0 z-10">
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Titles, people, genres"
                    className="w-40 sm:w-60 px-4 py-1 text-sm bg-black/80 border border-white/20 text-white rounded-sm focus:outline-none"
                  />
                  <button type="button" onClick={toggleSearch} className="absolute right-2 top-1.5 text-gray-400">
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button onClick={toggleSearch} className="text-gray-300 hover:text-white p-1">
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* User menu */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link to="/favorites" className="text-gray-300 hover:text-white p-1">
                  <Heart size={20} />
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-300 hover:text-white">
                    <User size={20} className="mr-1" />
                    <span className="text-sm hidden sm:inline">{currentUser.displayName}</span>
                  </button>
                  <div className="absolute right-0 w-40 mt-2 py-2 bg-netflixBlack border border-gray-800 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-1 rounded-sm text-sm">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-netflixRed text-white px-3 py-1 rounded-sm text-sm hover:bg-red-700 transition">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden ml-2 p-1 text-gray-300 hover:text-white focus:outline-none"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-netflixBlack border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-800 rounded-md">
              Home
            </Link>
            <Link to="/search?q=movies" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
              Movies
            </Link>
            <Link to="/search?q=tv" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
              TV Shows
            </Link>
            {currentUser && (
              <Link to="/favorites" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
                My List
              </Link>
            )}
            {!currentUser ? (
              <div className="pt-4 pb-3 border-t border-gray-800">
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
                  Sign In
                </Link>
                <Link to="/signup" className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-800">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <User size={36} className="text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{currentUser.displayName}</div>
                    <div className="text-sm font-medium text-gray-400">{currentUser.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;