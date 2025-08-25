import { useState, useEffect } from "react";
import { fetchMovies } from "../utils/fetchMovies";

interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  poster_path?: string;
  backdrop_path: string;
  overview: string
  first_air_date?: string; 
}

interface HeroSectionProps {
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movie: Movie) => boolean;
}

const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data?.results || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { movies, loading, error };
};

export default useFetchMovies;



