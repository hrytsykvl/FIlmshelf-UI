import { WATCHLIST_KEY } from '../constants/constants';

export function checkMoviesInWatchlist(movieIds: number[]): {
  [movieId: number]: boolean;
} {
  const storedWatchlists = JSON.parse(
    localStorage.getItem(WATCHLIST_KEY) || '[]'
  );

  if (!storedWatchlists.length || !storedWatchlists[0].movieIds) {
    return {};
  }

  const watchlistSet = new Set(storedWatchlists[0].movieIds);

  const statusMap: { [movieId: number]: boolean } = {};

  movieIds.forEach((movieId) => {
    statusMap[movieId] = watchlistSet.has(movieId);
  });

  return statusMap;
}

export function updateMovieInWatchlist(
  movieId: number,
  isAddition: boolean,
  watchlistId: number
) {
  const storedWatchlists = JSON.parse(
    localStorage.getItem(WATCHLIST_KEY) || '[]'
  );

  const watchlist = storedWatchlists.find(
    (list: any) => list.watchlistId === watchlistId
  );

  if (!watchlist || !watchlist.movieIds) {
    return;
  }

  const { movieIds } = watchlist;
  const index = movieIds.indexOf(movieId);

  isAddition
    ? index === -1 && movieIds.push(movieId)
    : index !== -1 && movieIds.splice(index, 1);

  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(storedWatchlists));
}

export function updateWatchlistStore(
  watchlistId: number,
  title: string | null,
  removeWatchlist = false
): void {
  const storedWatchlists = JSON.parse(
    localStorage.getItem(WATCHLIST_KEY) || '[]'
  );

  if (removeWatchlist) {
    const updatedWatchlists = storedWatchlists.filter(
      (list: any) => list.watchlistId !== watchlistId
    );
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlists));
    return;
  }

  const newWatchlist = {
    watchlistId,
    title,
    movieIds: [],
  };

  storedWatchlists.push(newWatchlist);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(storedWatchlists));
}
