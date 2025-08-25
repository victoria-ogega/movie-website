import React, { useState } from "react";
import HeroSection from "../shared-components/herosection";
import MyList from "../MyList/page";

interface Movie {
  id: number;
  original_title: string;
  backdrop_path: string;
  overview?: string;
}

export default function App() {
  const [favorites, setFavorites] = useState<Movie[]>([]); // specify type here

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === movie.id)
        ? prev.filter((fav) => fav.id !== movie.id)
        : [...prev, movie]
    );
  };

  const isFavorite = (movie: Movie) => favorites.some((fav) => fav.id === movie.id);

  return (
    <>
      <HeroSection toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
      <MyList favorites={favorites} toggleFavorite={toggleFavorite} />
    </>
  );
}
