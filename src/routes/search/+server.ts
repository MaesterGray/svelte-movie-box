import { json } from '@sveltejs/kit';
import {SECRET_TMDB_API_KEY} from '$env/static/private'
const header = {
    accept: 'application/json',
		Authorization: `Bearer ${SECRET_TMDB_API_KEY}`
}

export async function POST({request}){
    let processedSearchResultArray;
const query =  await request.json()
try {
	let searchRequest = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=1`,
        {headers:header}
    )
    let searchResponse = await searchRequest.json() as {results:{id:number, backdrop_path:string,media_type:'tv'|'movie',original_name:string}[]}
	let stepOneArray = searchResponse.results.filter((result)=> result.media_type ==='tv'||result.media_type==='movie')
	processedSearchResultArray = stepOneArray.splice(0,3) as {id:number, backdrop_path:string,media_type:'tv'|'mvoie',original_name:string,original_title:string}[]
    
} catch (error) {
    return json({staus:'search failed'})
}
    return json({processedSearchResultArray},{status:200})
}