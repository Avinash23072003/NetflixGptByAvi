export const LOGO_URL =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const MOVIE_CDN_URL = "https://image.tmdb.org/t/p/w200/";
export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/537e2c5e-c750-4d4c-9f7a-e66fe93eb977/IN-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_b00eeb83-a7e8-4b5b-8ff7-86ed92c51caf_small.jpg";

export const API_CALL = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTBiODc3YWMyMWZjZGZlZmJhZGNkZjZlN2VkYjYxZSIsIm5iZiI6MTcyMDkwMjM5NC4yMzkwNywic3ViIjoiNjY4YzFhM2VjMDMwMzYzYjliNjY0MDgyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.MUTF4h8UNyxMoxtQHAsVNZM4rYMoQ1Or6S-MZqXJ6Aw",
  },
};
export const SUPPORTED_LANGUAGE = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "japanese", name: "Japanese" },
];
const apiKey = import.meta.env.VITE_API_KEY;
export const GEMINI_API =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}` 
