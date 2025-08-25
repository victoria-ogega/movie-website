"use client";
import useFetchMovies from "./hooks/useFetchMovies";
import Navbar from "./shared-components/Navbar";
import { Footer } from "./shared-components/Footer";
import HeroSection from "./shared-components/herosection";
import { useState } from "react";
import { useEffect } from "react";


export default function Home() {
  const { movies, loading, error } = useFetchMovies();
   const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState(movies);
     useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

    
  return (
    <div className="bg-black">
       <Navbar
             searchTerm={searchTerm}
             setSearchTerm={setSearchTerm}
             onSearch={() => {}} 
           />
       <HeroSection ></HeroSection>
      <div className="w-300 m-auto">
        {loading && <h3>Loading ...</h3>}
        {error && <h3>{error}</h3>}
        <div className="flex flex-wrap text-white">
          {filteredMovies.map((movie) => {
            return (
              <div key={movie.id} className="w-70 mt-4 mb-5 ml-4 pl-10 relative">
                {movie.poster_path && (
                  <img
                    alt={`${movie.original_title} poster`}
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    width={300}
                    height={300}
                    className="rounded-md"
                  />
                )}
                <button
                  type="button"
                  className="absolute top-2 right-2 text-3xl focus:outline-none"
                >
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}


