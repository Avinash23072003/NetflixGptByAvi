import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_URL } from "../utils/constans";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-black">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="Background"
        />
        {/* Optional: Add a dark overlay for better readability */}
        
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center pt-20 px-4 md:px-8">
        <GptSearchBar />
        <div className="w-full max-w-5xl">
          <GptMovieSuggestion />
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
