export interface BaseMedia {
  id: number;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genre_ids: number[];
  overview: string;
  genres: Genre[];
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos: {
    results: Video[];
  };
  reviews: {
    results: Review[];
  };
  recommendations:Recommendations; 
  totalPages: number;
}

export interface Movie extends BaseMedia {
  title: string;
  release_date: string;
  runtime: number;
}

export interface TVShow extends BaseMedia {
  name: string;
  first_air_date: string; 
  episode_run_time: number[];
  seasons: Season[];
}

export interface Season {
  season_number: number;
  episode_count: number;
  air_date: string;
  poster_path: string;
}

export interface MediaResponse<T> {
  movies: T[];
  totalPages: number;
}

export interface Genre {
  id: number;
  name: string;
}


export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

export interface Video {
  id: string;
  key: string; 
  name: string;
  site: string;
  type: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface Recommendations{
  page:number;
  results:Array<Movie|TVShow>;
  total_pages:number;
}