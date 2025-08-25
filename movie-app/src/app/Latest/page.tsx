"use client";
import useFetchNowPlaying from "../hooks/useFetchNowPlating";
import Navbar from "../shared-components/Navbar";
import { Footer } from "../shared-components/Footer";
import { useState } from "react";

export default function Latest() {
  const { movies, loading, error } = useFetchNowPlaying();
    const [searchTerm, setSearchTerm] = useState("");
  


  const sortedMovies = movies.slice().sort((a, b) => {
    const dateA = new Date(a.release_date || a.first_air_date || 0).getTime();
    const dateB = new Date(b.release_date || b.first_air_date || 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="bg-black">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={() => {}} 
      />
      <div className="w-300 m-auto">
        {loading && <h3>Loading ...</h3>}
        {error && <h3>{error}</h3>}
        <div className="flex flex-wrap text-white">
          {sortedMovies.map((movie) => (
            <div key={movie.id} className="w-70 mt-4 mb-5 ml-4 pl-10">
              {movie.poster_path && (
                <img
                  alt={`${movie.original_title || movie.original_title} poster`}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  width={300}
                  height={300}
                  className="rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>
   <Footer></Footer>
    </div>
  );
}
