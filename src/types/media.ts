export interface BaseMedia {
  id: number;
  poster_path: string;
  vote_average: number;
  genre_ids: number;
  overview: string;
}

export interface Movie extends BaseMedia {
  title: string;
}

export interface TVShow extends BaseMedia {
  name: string;
}

export interface MediaResponse<T> {
  media: T[];
  totalPages: number;
}
