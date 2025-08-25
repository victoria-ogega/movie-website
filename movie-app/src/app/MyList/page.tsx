interface Movie {
  id: number;
  original_title: string;
  backdrop_path?: string;
  overview?: string;
}

interface MyListProps {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

export default function MyList({ favorites, toggleFavorite }: MyListProps) {
  if (!favorites || favorites.length === 0) {
    return <div>No favorites added yet.</div>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {favorites.map((movie) => (
        <div key={movie.id} className="relative bg-black text-white rounded-lg shadow">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.original_title}
            className="rounded-t-lg object-cover w-full h-48"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{movie.original_title}</h3>
            <button
              className="absolute top-2 right-2 text-yellow-500 text-2xl cursor-pointer"
              aria-label="Remove from favorites"
              onClick={() => toggleFavorite(movie)}
            >
              ♥
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

