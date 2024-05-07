<script lang='ts'>
    import * as Card from '$lib/components/ui/card'
    import Avatar from './Avatar.svelte';
    import * as Select from '$lib/components/ui/select';
    import { imageBase } from '$lib';
    import { page } from '$app/stores';
    export let data;
    let presentVideoKey =data.videos[1].key

    function videoToggle (value:string){
        presentVideoKey = value
    };

    function formatRuntime(minutes:number) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
  
      // Create a string to display the runtime
      let formattedRuntime = '';
      
      if (hours > 0) {
          formattedRuntime += hours + 'h';
      }
      
      if (remainingMinutes > 0) {
          formattedRuntime += ' ' + remainingMinutes + 'min';
      }
  
      return formattedRuntime;
    }
     function formatReleaseYear(releaseDate:string){
       return releaseDate.split('-',1)
     }

</script>
<slot />
    


<section class=" flex flex-col space-y-4 w-screen pb-5">
    <div class=" w-full h-[70%] flex items-center justify-center">
        <Card.Root class=' w-[85%] aspect-video border-none '>
            <Card.Content class=' w-full h-full p-0'>
                 <iframe class=" w-full h-full" src={`http://www.youtube.com/embed/${presentVideoKey}?enablejsapi=1&origin=http://example.com`}  title="videos relating to this movie">
                </iframe> 
            </Card.Content>
        
        </Card.Root> 
        
    </div>

    <span class=" w-full flex flex-col  lg:flex lg:flex-row lg:items-center space-x-2 px-2 lg:space-x-2 text-white lg:justify-center relative font-Poppins">
        <div class=" font-bold text-lg  text-center">
            {#if $page.url.pathname.includes('movies')}
            {data.movieOrSerie.original_title}
            {:else}
            {data.movieOrSerie.original_name}
        {/if}
    </div>
        <p>
            {#if $page.url.pathname.includes('movies')}
                <div>{formatRuntime(data.movieOrSerie.runtime)}</div>
                {:else}
                <div class=" flex flex-col"> 
                    <span>{`Sesons : ${data.movieOrSerie.number_of_seasons}`}</span>
                    <span>{`No. of Episodes : ${data.movieOrSerie.number_of_episodes}`}</span>
                </div>
            {/if}
        </p>
        <p>{$page.url.pathname.startsWith('/movies')?formatReleaseYear(data.movieOrSerie.release_date):formatReleaseYear(data.movieOrSerie.first_air_date)}</p>
        <p class=" ">
            {#each data.movieOrSerie.genres as genre}
            <small >{genre.name}</small>
        {/each}</p>
        <Select.Root portal={null} >
            <Select.Trigger class=' w-[27%] lg:w-[15%] text-black absolute right-10 bottom-0 lg:right-[3.33%]'>
                <Select.Value placeholder="Pick a video" />
            </Select.Trigger>
            <Select.Content>
                <Select.Group class='z-50 '>
                    {#each data.videos as video}
                        <Select.Item class=' pl-0 lg:pl-2 '  on:click={()=>videoToggle(video.key)} value ={video.name}>{video.name}</Select.Item>
                    {/each}
                </Select.Group>

            </Select.Content>

        </Select.Root>
    </span>
</section>

        <section class=" flex flex-col lg:flex-row lg:p-0 justify-evenly w-full p-3 ">

            <aside class=" flex flex-col space-y-6 lg:w-[60%] text-white">
                <p class=" w-full font-Poppins">
                    {data.movieOrSerie.overview}
                </p>

                <div class=" w-full flex flex-col space-y-3 font-Poppins">
                    <h1>Cast</h1>
                    <span class=" w-full overflow-x-scroll flex flex-col">
                        
                        <span class=" flex ">
                            {#each data.cast as cast (cast.original_name)}
                            <Avatar  original_name={cast.original_name} profile_path={cast.profile_path} character={cast.character} />
                            {/each}
                        </span>
                    </span>

                    <span class=" overflow-x-scroll  flex flex-col w-full space-y-3">
                        <h1>Producers</h1>
                        <span class=" flex  ">
                            {#each data.crew as crew (crew.original_name)}
                            <Avatar original_name={crew.original_name} profile_path={crew.profile_path} />
                            {/each}
                        </span>
                    </span>
                </div>
                </aside>
                

            <aside class=" flex flex-col lg:w-[30%] space-y-2 font-Poppins">
                <div class=" flex flex-col w-full space-y-3">
                    <button class=" bg-orange-600  rounded-md h-10">See Showtimes</button>
                    <button class=" bg-orange-200 rounded-md h-10">More Watch options</button>
                </div>
                <h1 class=" text-white">Recommendations</h1>
                <div class=" flex  space-x-1 w-full">
                        {#each data.similar.splice(0,3) as recommendation (recommendation.id)}
                            <div class="w-[33.33%] flex-col">
                                <div class=" w-full aspect-[9/16] ">
                                   <a href={$page.url.pathname.includes('movies')?`/movies/${recommendation.id}`:`/series/${recommendation.id}`}><img class=" object-fill w-full h-full rounded-t-md" src={`${imageBase}${recommendation.poster_path}`} alt="">
                                </div>
                                 <!-- <p class=" w-full text-white rounded-b-md bg-gray-500 h-10  items-center p-2 truncate">{recommendation.original_name}</p> -->
                            </div>
                        
                            
                        {/each}
                </div>
            </aside>
        </section>
    


