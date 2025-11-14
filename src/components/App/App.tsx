import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';


function App() {
  const [ query,setQuery ] = useState(''); 
  const [ selectedMovie, setSelectedMovie ] = useState<Movie | null>(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
  });

  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
  };

  useEffect(() => {
    if (!isLoading && query && data && data.results.length === 0) {
      toast.error("No movies found for your request");
    }
  }, [isLoading, data, query]);

  const movies = data?.results ?? [];

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
