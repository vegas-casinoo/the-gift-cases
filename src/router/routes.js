import { renderHome } from "../screens/home/index.js";
import { renderGames } from "../screens/games/index.js";
import { renderRating } from "../screens/rating/index.js";
import { renderProfile } from "../screens/profile/index.js";

export const routes = {
  "/home": renderHome,
  "/games": renderGames,
  "/rating": renderRating,
  "/profile": renderProfile,
};