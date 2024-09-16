export interface BaseMedia {
  id: number;
  poster_path: string;
  vote_average: number;
  genre_ids: number;
  overview: string;
  totalPages: number;
}

export interface Movie extends BaseMedia {
  title: string;
}

export interface TVShow extends BaseMedia {
  name: string;
}

export interface MediaResponse<T> {
  movies: T[];
  totalPages: number;
}

export interface Genre {
  id: number;
  name: string;
}
