import type { movieResult } from '$lib/types';
import { header } from '$lib';
export async function load({params}) {
	let movies;
	let series;
	

	const moviesRequest = await fetch(
		`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${params.page_number}&sort_by=popularity.desc&with_origin_country=US`,
		{
			headers: header
		}
	);
	const seriesRequest = await fetch(
		`https://api.themoviedb.org/3/discover/tv?first_air_date_year=2024&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${params.page_number}&sort_by=popularity.desc&with_origin_country=US`,
		{
			headers: header
		}
	);
	

	try {
		const requests = await Promise.all([
			moviesRequest,
			seriesRequest
		]);
		const dataFromRequests = await Promise.all([
			requests[0].json(),
			requests[1].json(),
		]);

		movies = {
			totalPages: dataFromRequests[0].total_pages,
			movies: dataFromRequests[0].results
		} ;
		//console.log(movies)
		series = {
			totalPages: dataFromRequests[1].total_pages,
			series: dataFromRequests[1].results
		} 
	} catch (err) {
		console.log(err);
	}
	return {
		movies:movies?.movies,
		series:series?.series,
		totalPages:Math.min(movies?.totalPages,series?.totalPages)
	} as {
		movies:movieResult[],
		series:movieResult[],
		totalPages:number
	}
}