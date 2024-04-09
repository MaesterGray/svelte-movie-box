export type MovieProps = {
	image: string;
	title: string;
	rating: number;
	debut: string;
	id: number;
	genres: [id: number, name: string];
	// variants:'Movies'|'Tv-series'
};
export type movieResult = {
	variants: 'Movies' | 'Tv-series';
	id: number;
	poster_path: string;
	genre_ids: [id: number, name: string];
	original_title: string;
	vote_average: number;
	name: string;
	release_date: string;
	first_air_date: string;
	title: string;
	overview: string;
	backdrop_path: string;
};
