import type { movieResult } from '$lib/types';
import type { CastOrCrew } from "$lib/types";
import type { Video } from "$lib/types";
import { SECRET_TMDB_API_KEY } from '$env/static/private';
const header = {
    accept: 'application/json',
	Authorization: `Bearer ${SECRET_TMDB_API_KEY}`
}

export async function load({url,params}){
let movieOrSerieRequest;
let creditsRequest;
let videosRequest;
let similarRequest;
let movieOrSerie;
let videos;
let credits;
let similar;
let crew;
let cast;
if(url.pathname.includes('movies')){
movieOrSerieRequest = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,{headers:header})
creditsRequest = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?language=en-US`,{headers:header})
videosRequest = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US`,{headers:header})
similarRequest = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/recommendations?language=en-US&page=1`,{headers:header})
}else{
    movieOrSerieRequest = await fetch(`https://api.themoviedb.org/3/tv/${params.id}?language=en-US`,{headers:header})
    creditsRequest = await fetch(`https://api.themoviedb.org/3/tv/${params.id}/credits?language=en-US`,{headers:header})
    videosRequest = await fetch(`https://api.themoviedb.org/3/tv/${params.id}/videos?language=en-US`,{headers:header})
    similarRequest = await fetch(`https://api.themoviedb.org/3/tv/${params.id}/recommendations?language=en-US&page=1`,{headers:header})

}
try {
   const allResponses = await Promise.all([movieOrSerieRequest,videosRequest,creditsRequest,similarRequest])
    const allParsedResponses = await Promise.all([allResponses[0].json(),allResponses[1].json(),allResponses[2].json(),allResponses[3].json(),])
    movieOrSerie= allParsedResponses[0]
    videos = allParsedResponses[1].results
    credits = allParsedResponses[2] 
    similar = allParsedResponses[3].results
     crew = credits.crew.filter((crewMember:CastOrCrew)=> crewMember.job ==='Executive Producer' ||crewMember.job ==='Producer')
     cast = credits.cast
} catch (error) {
    console.log(error)
}
return {
    movieOrSerie,
    cast,
    crew,
    videos,
    similar
} as{
    movieOrSerie:movieResult
    cast: CastOrCrew[]
    crew:CastOrCrew[]
    videos:Video[]
    similar:movieResult[]
}
}