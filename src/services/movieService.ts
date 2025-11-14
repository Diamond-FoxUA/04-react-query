import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesHttpResponce {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (query: string, page: number): Promise<MoviesHttpResponce> => {
  const response = await axios.get<MoviesHttpResponce>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US',
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data;
};
