
export type movieResult = {
	variants: 'Movies' | 'Tv-series';
	id: number;
	poster_path: string;
	genres: {id:number,name:string}[];
	original_title: string;
	vote_average: number;
	name: string;
	release_date: string;
	first_air_date: string;
	title: string;
	backdrop_path: string;
	original_name:string;
	overview:string
	runtime:number
	number_of_episodes:number
	number_of_seasons:number
};

export type Video ={
	name:string
	key:string
	site:string
	id:string
}

export type CastOrCrew ={
known_for_department:string
character:string,
job:string
original_name:string
profile_path:string
}