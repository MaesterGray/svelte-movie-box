import { redirect } from '@sveltejs/kit';

export async function handle({event,resolve}){
if (event.url.pathname==='/') {
    console.log('redirected')
    redirect(303,`/${1}`)
}
const response = await resolve(event);
return response;
}


