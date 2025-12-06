import { WATCHLIST_KEY } from "../constants/constants";

export function checkMoviesInWatchlist(movieIds: number[]): {
  [movieId: number]: boolean;
} {
  const storedWatchlist = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');

  if (!storedWatchlist.length) {
    return {};
  }
  const watchlistSet = new Set(storedWatchlist);

  const statusMap: { [movieId: number]: boolean } = {};

  movieIds.forEach((movieId) => {
    statusMap[movieId] = watchlistSet.has(movieId);
  });

  return statusMap;
}

export function updateMovieInWatchlist(movieId: number, isAddition: boolean) {
  const storedWatchlist = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');

  if (!storedWatchlist.length) {
    return;
  }

  const index = storedWatchlist.indexOf(movieId);

  isAddition
    ? index === -1 && storedWatchlist.push(movieId)
    : index !== -1 && storedWatchlist.splice(index, 1);

  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(storedWatchlist));
}
