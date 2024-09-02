import { BaseMedia } from "../types/media";
import { getFromLocalStorage } from "./storageUtils";

export const getCachedData = <T extends BaseMedia>(
  cacheKey: string,
  cacheTimeKey: string,
  cacheDuration: number = 24 * 60 * 60 * 1000
): T[] | null => {
  const cachedData = getFromLocalStorage(cacheKey);
  const cachedTime = getFromLocalStorage(cacheTimeKey);

  if (cachedData && cachedTime) {
    const timeDiff = Date.now() - parseInt(cachedTime, 10);
    if (timeDiff < cacheDuration) {
      return JSON.parse(cachedData) as T[];
    }
  }
  return null;
};
