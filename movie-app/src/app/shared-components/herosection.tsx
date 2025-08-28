'use client';
import Link from "next/link";
import Button from "./button";
import React, { useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";

interface Movie {
  id: number;
  original_title: string;
  backdrop_path: string;
  overview: string;
}

export default function HeroSection() {
  const { movies, loading, error } = useFetchMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (movies.length === 0) return <div>No movies found</div>;

  const movie = movies[currentIndex];

  const goPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? movies.length - 1 : prev - 1));
  };
  const goNext = () => {
    setCurrentIndex(prev => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const isFavorite = (movie: Movie) =>
    favorites.some(fav => fav.id === movie.id);

  const toggleFavorite = (movie: Movie) => {
    setFavorites(prev =>
      isFavorite(movie)
        ? prev.filter(fav => fav.id !== movie.id)
        : [...prev, movie]
    );
  };

  return (
    <>
      <section className="relative w-full h-[500px] bg-black overflow-hidden flex items-center text-white">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.original_title}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="relative z-10 max-w-2xl px-10">
          <h1 className="text-5xl font-bold">
            {movie.original_title && (
              <>
                {movie.original_title.split(" ")[0]}{" "}
                <span className="text-yellow-500">
                  {movie.original_title.split(" ").slice(1).join(" ")}
                </span>
              </>
            )}
          </h1>
          <p className="my-4 max-w-xl opacity-75">{movie.overview}</p>
          <div className="flex gap-5 mt-15">
            <Button
              buttonText={
                <li className="list-none">
                  <Link href="/Sign in">Watch Now</Link>
                </li>
              }
              variant="secondary"
              onClickHandler={() => alert("Click was successful")}
            />
            <button
              onClick={() => toggleFavorite(movie)}
              className={`text-3xl cursor-pointer hover:text-yellow-500 transition-colors ${
                isFavorite(movie) ? "text-yellow-500" : "text-gray-400"
              }`}
              aria-label="Toggle favorite"
            >
              {isFavorite(movie) ? "♥" : "♡"} Add to favourites
            </button>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-6">
          <span
            onClick={goPrevious}
            className="w-4 h-4 cursor-pointer rounded-full bg-gray-400 hover:bg-yellow-500 transition-colors"
            aria-label="Previous movie"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goPrevious()}
          />
          <span
            className="w-4 h-4 rounded-full bg-yellow-500"
            aria-label="Current movie"
            role="button"
            tabIndex={-1}
          />
          <span
            onClick={goNext}
            className="w-4 h-4 cursor-pointer rounded-full bg-gray-400 hover:bg-yellow-500 transition-colors"
            aria-label="Next movie"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goNext()}
          />
        </div>
      </section>

      <section className="p-7 bg-black text-white">
        <h2 className="text-2xl mb-4">My Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorite movies yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <div key={fav.id} className="relative bg-gray-900 rounded shadow p-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${fav.backdrop_path}`}
                  alt={fav.original_title}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 font-bold">{fav.original_title}</h3>
                <button
                  onClick={() => toggleFavorite(fav)}
                  className="absolute top-2 right-2 text-yellow-500 text-2xl cursor-pointer"
                  aria-label="Remove from favorites"
                >
                  ♥
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
