import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, SUPPORTED_LANGUAGE } from "../utils/constans";
import { showGPTSearchView } from "../utils/gptSearchSlice";
import { languageChange } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showgptSearch = useSelector((store) => store.gpt.showgptsearch);

  // Only call navigate on explicit sign-out
  const signOutMethod = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("Sign Out successfully");
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(addUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL || "",
        }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        // no navigate here
      }
    });
    return unsubscribe;
  }, [dispatch, navigate]);

  return (
    <div className="w-full p-2  absolute z-50 flex flex-col md:flex-row justify-between bg-gradient-to-b from-black">
      <img src={LOGO_URL} alt="logo" className="mt-4 w-[180px] mx-auto md:mx-0" />

      {user && (
        <div className="flex items-center pt-4">
          {showgptSearch && (
            <select
              className="pl-6 mt-4 bg-gray-800 w-20.5 h-10 mr-4 rounded-md text-white"
              onChange={(e) => dispatch(languageChange(e.target.value))}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="pr-6 mt-4 pl-4 bg-purple-800 w-22 h-10 mr-4 rounded-md text-white"
            onClick={() => dispatch(showGPTSearchView())}
          >
            {showgptSearch ? "Home page" : "GPT search"}
          </button>

          <img src={user.photoURL} className="pr-2 w-14 h-14 rounded-full" />

          <button
            onClick={signOutMethod}
            className="text-white text-center cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
