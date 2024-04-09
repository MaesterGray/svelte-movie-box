import { SECRET_TMDB_API_KEY } from '$env/static/private';
import type { movieResult } from '$lib/types';
export async function load() {
	let movies;
	let trendingMovies: movieResult[];
	let series;
	let trendingSeries;
	const header = {
		accept: 'application/json',
		Authorization: `Bearer ${SECRET_TMDB_API_KEY}`
	};

	const moviesRequest = await fetch(
		'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=2&sort_by=popularity.desc&with_origin_country=US',
		{
			headers: header
		}
	);
	const seriesRequest = await fetch(
		'https://api.themoviedb.org/3/discover/tv?first_air_date_year=2023&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=US',
		{
			headers: header
		}
	);
	const trendingMoviesRequest = await fetch(
		'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
		{
			headers: header
		}
	);
	const trendingSeriesRequest = await fetch(
		'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
		{
			headers: header
		}
	);

	try {
		const requests = await Promise.all([
			moviesRequest,
			trendingMoviesRequest,
			trendingSeriesRequest,
			seriesRequest
		]);
		const dataFromRequests = await Promise.all([
			requests[0].json(),
			requests[1].json(),
			requests[2].json(),
			requests[3].json()
		]);
		trendingMovies = dataFromRequests[1].results as movieResult[];

		movies = {
			totalPages: dataFromRequests[0].total_pages,
			movies: dataFromRequests[0].results
		} as {
			totalPages: number;
			movies: movieResult[];
		};
		trendingSeries = dataFromRequests[2].results as [];
		series = {
			totalPages: dataFromRequests[3].total_pages,
			series: dataFromRequests[3].results
		} as {
			totalPages: number;
			series: movieResult[];
		};
	} catch (err) {
		console.log(err);
	}
	return {
		trendingMovies,
		movies,
		trendingSeries,
		series
	};
}
