import { BaseMedia } from "../types/media";
import { getFromLocalStorage } from "./storageUtils";

export const getCachedData = <T extends BaseMedia>(
  cacheKey: string,
  cacheTimeKey: string,
  cacheDuration: number = 24 * 60 * 60 * 1000
): { movies: T[]; totalPages: number } | null => {
  const cachedData = getFromLocalStorage(cacheKey);
  const cachedTime = getFromLocalStorage(cacheTimeKey);

  if (cachedData && cachedTime) {
    const timeDiff = Date.now() - parseInt(cachedTime, 10);
    if (timeDiff < cacheDuration) {
      try {
        return JSON.parse(cachedData) as { movies: T[]; totalPages: number };
      } catch (e) {
        console.error("Failed to parse cached data:", e);
        return null;
      }
    }
  }
  return null;
};
