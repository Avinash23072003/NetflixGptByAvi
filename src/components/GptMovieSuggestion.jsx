import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie } from "../utils/gptSearchSlice";
import MoviesList from "./MoviesList";

const GptMovieSuggestion = () => {
  const dispatch = useDispatch();
  const { selectedMovie, similarMovies, loading } = useSelector((store) => store.gpt);

  if (loading) return <h1 className="text-white text-xl p-6">Loading...</h1>;
  if (!selectedMovie) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-50 rounded-lg shadow-lg">
      {/* Main Selected Movie Info */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          className="w-48 md:w-60 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{selectedMovie.title}</h2>
          <p className="mb-2 text-yellow-400 font-semibold">
            ⭐ IMDb Rating: {selectedMovie.vote_average?.toFixed(1)}/10
          </p>
          <p className="text-sm md:text-base mb-4 text-gray-200 italic">
            {selectedMovie.overview || "No description available."}
          </p>

          {/* Cast (if available) */}
          {selectedMovie.cast && selectedMovie.cast.length > 0 && (
            <>
              <p className="font-semibold underline mb-1">Top Cast:</p>
              <ul className="list-disc list-inside text-sm md:text-base">
                {selectedMovie.cast.map((actor) => (
                  <li key={actor.id}>
                    {actor.name} as <span className="text-gray-300">{actor.character}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Similar Movies Grid */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Similar Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer bg-gray-900 p-2 rounded-lg hover:bg-gray-800"
              onClick={() => dispatch(setSelectedMovie(movie))}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-2"
              />
              <h3 className="text-sm font-medium">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
