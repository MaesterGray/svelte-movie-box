<script lang="ts">
    
    import * as Carousel from '$lib/components/ui/carousel/';
	import * as Card from '$lib/components/ui/card/';
    import { imageBase } from '$lib';
    import Autoplay from 'embla-carousel-autoplay'
	import { presentViewStore } from '$lib/stores/browserStore';
    export let data;
   import type { movieResult } from '$lib/types';

   function handleToggle(option:string){
        presentViewStore.set(option);
   }
   let trendingList :movieResult[];

   $:if ($presentViewStore==='movies' && data) {
    trendingList = data.trendingMovies as movieResult[]
   }else if($presentViewStore ==='series'){
    trendingList = data.trendingSeries as movieResult[]
   }
    //console.log(data.trendingSeries)

</script>




            
<Carousel.Root plugins={[Autoplay({delay:2500,jump:true,stopOnMouseEnter:true,stopOnInteraction:false})]} class="w-full overflow-x-hidden z-0 outline-none ">
    <Carousel.Content >
        {#each trendingList as item (item.id)}
        <Carousel.Item>
            <div class=" p-1 font-DmSans">
                <Card.Root class=' border-none'>
                    <Card.Content class="flex aspect-video  rounded-md bg-black  text-white p-0 relative">
                        <img src={`${imageBase}${item.backdrop_path}`} class=" object-full h-full w-full" alt="" />
                        <div class=" absolute bottom-0 left-0 aspect-video w-[40%] lg:w-[30%] flex flex-col space-y-1 lg:space-y-3 backdrop-blur-md rounded-md items-center justify-center ">
                            <p class=" truncate font-bold text-2xl lg:text-4xl w-[90%] text-center">{$presentViewStore==='movies'?item.original_title:item.original_name}</p>
                           <a class=" bg-orange-600 rounded-md flex items-center justify-center p-1 font-bold lg:text-2xl hover:cursor-pointer  active:bg-orange-300" href={$presentViewStore ==='movies'?`/movies/${item.id}`:`/series/${item.id}`}>Watch trailer</a> 
                        </div>
                    </Card.Content>
                </Card.Root>
            </div>
        </Carousel.Item>
    {/each}  
   
        
        
    </Carousel.Content>
    <Carousel.Next class=" right-5"  />
    <Carousel.Previous class=" left-5" />
</Carousel.Root>
        
<div class=" flex h-10 w-screen items-center justify-center space-x-2 text-orange-300">
    <div class=" flex flex-col  items-center">
        <button class=" hover:cursor-pointer" on:click={()=>(handleToggle('movies'))}>Movies</button>
        {#if $presentViewStore ==='movies'}
        <div class=" bg-orange-600 w-6 h-1 rounded-md"></div>
        {/if}
       
    </div>
    <div class=" flex flex-col items-center">
        <button class=" hover:cursor-pointer" on:click={()=>(handleToggle('series'))}>Series</button>
        {#if $presentViewStore==='series'}
        <div class=" h-1 w-6 bg-orange-600 rounded-md"></div>  
        {/if}
       
    </div>
</div>
<slot/>