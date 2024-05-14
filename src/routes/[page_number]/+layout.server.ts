import type { movieResult } from '$lib/types';
import {SECRET_TMDB_API_KEY} from '$env/static/private'
const header = {
    accept: 'application/json',
		Authorization: `Bearer ${SECRET_TMDB_API_KEY}`
}


export async function load(){
    let trendingMovies ;
	let trendingSeries;
   
    const trendingMoviesRequest = await fetch(
		'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
		{
			headers: header
		}
	)
	const trendingSeriesRequest = await fetch(
		'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
		{
			headers: header
		}
	)
	try{
	const Requests = await Promise.all([trendingMoviesRequest,trendingSeriesRequest])
	const dataFromRequests = await Promise.all([Requests[0].json(),Requests[1].json()])
		trendingMovies = dataFromRequests[0] .results as  movieResult[]
		trendingSeries = dataFromRequests[1] .results  as movieResult[]
	}catch(err){
		console.log(err)
	}
	return{
	trendingMovies:	trendingMovies ,
	trendingSeries:trendingSeries
	} as {
		trendingMovies:movieResult[]
		trendingSeries:movieResult[]
	}
}