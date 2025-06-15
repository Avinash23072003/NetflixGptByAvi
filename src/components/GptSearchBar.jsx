import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BG_URL, API_CALL } from "../utils/constans";
import languageConstants from "../utils/languageConstants";
import { addgptMovieResult } from "../utils/gptSearchSlice";
import { useState } from "react";

const GptSearchBar = () => {
  const languageSelector = useSelector((store) => store.config.initialLang);
  const searchText = useRef("");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const tmdbApi = async (movie) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movie
      )}&include_adult=false&language=en-US&page=1`,
      API_CALL
    );
    const json = await res.json();
    return json.results;
  };

  const getCastForMovie = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        API_CALL
      );
      const json = await res.json();
      return json.cast.slice(0, 5); // return top 5 actors
    } catch (err) {
      console.error("Cast fetch error:", err);
      return [];
    }
  };

  const gptSearchBtn = async () => {
    const prompt = searchText.current.value.trim();
    if (!prompt) return;

    setLoading(true); // Show loader

    const queryText = `Suggest a list of 5 movie titles (comma-separated) similar to: "${prompt}". Only return the movie names, no explanation.`;

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: queryText }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const gptText =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (!gptText) return;

      const titles = gptText.split(",").map((t) => t.trim());
      const moviePromiseArray = titles.map((movie) => tmdbApi(movie));
      const movieResults = await Promise.all(moviePromiseArray);

      const flatMovies = movieResults.map((res) => res?.[0]).filter(Boolean);
      if (flatMovies.length === 0) return;

      const firstMovie = flatMovies[0];
      const remainingMovies = flatMovies.slice(1);

      const cast = await getCastForMovie(firstMovie.id);

      dispatch(
        addgptMovieResult({
          firstMovie: { ...firstMovie, cast },
          similarMovies: remainingMovies,
        })
      );
    } catch (err) {
      console.error("GPT API Error:", err);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="relative">
      <div className="pt-[50%] md:pt-[15%] flex flex-col items-center justify-center">
        {/* Loader */}
        {loading && (
          <div className="text-white text-center text-xl font-semibold mb-4 animate-pulse">
            🔄 Fetching recommendations...
          </div>
        )}

        {/* Form */}
        <form
          className="flex flex-col md:flex-row items-center justify-center bg-black bg-opacity-70 p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            gptSearchBtn();
          }}
        >
          <input
            ref={searchText}
            type="text"
            placeholder={languageConstants[languageSelector].gptPlaceHolder}
            className="w-full md:flex-1 p-4 rounded-md text-black outline-none mb-4 md:mb-0 md:mr-2"
          />
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-red-800 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
          >
            {languageConstants[languageSelector].search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
