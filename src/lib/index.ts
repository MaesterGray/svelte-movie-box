// place files you want to import through the `$lib` alias in this folder.
export const imageBase = 'https://image.tmdb.org/t/p/original/';
import { PUBLIC_TMDB_API_KEY } from '$env/static/public';
export const header = {
    accept: 'application/json',
		Authorization: `Bearer ${PUBLIC_TMDB_API_KEY}`
}
