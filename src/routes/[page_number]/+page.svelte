<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/';
	import * as Pagination from '$lib/components/ui/pagination/';
	import { imageBase } from '$lib';
	import { goto } from '$app/navigation';
	export let data: PageData;
	import type { movieResult } from '$lib/types';
	import { presentViewStore } from '$lib/stores/browserStore';
	import { page } from '$app/stores';
let movielist:movieResult[];	
	$:if ($presentViewStore === 'movies') {
			movielist=data.movies as movieResult[]

		}else{
			movielist = data.series as movieResult[]
			
		}
function nextOrPrev(type:'next'|'previous'){
if (type==='next') {
	goto(`/${Number($page.params.page_number)+1}`)
}else{
	goto(`/${Number($page.params.page_number)-1}`)

}
}
</script>

<section class=" flex w-screen  flex-wrap  gap-4 md:gap-5 justify-center">
	{#each movielist as movieOrserie (movieOrserie.id) }
	<a class=" active:opacity-80" href={$presentViewStore==='movies'?`/movies/${movieOrserie.id}`:`/series/${movieOrserie.id}`}>
		<Card.Root class=" flex aspect-[9/16] w-[45vw]  rounded-lg  md:w-[15vw]  bg-black  border-none hover:cursor-pointer font-DmSans">
		<Card.Content class="rounded-md  p-0 w-full h-full">
				<div class=" aspect-square w-full rounded-lg ">
					<img
						class=" object-fill h-full w-full rounded-t-lg"
						src={`${imageBase}${movieOrserie.backdrop_path}`}
						alt=""
					/>
				<div class=" flex w-full flex-col text-white p-3 justify-center ">
					<span class=" text-sm">{$presentViewStore==='movies'?movieOrserie.release_date:movieOrserie.first_air_date}</span>
					<span  class="truncate w-[90%] text-xl font-bold">{$presentViewStore==='movies'?movieOrserie.title:movieOrserie.name}</span>
					<span>Rating : {Math.floor(movieOrserie.vote_average)}/10</span>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</a>
	{/each}

		
	
		
			

		<!--  -->

</section>
<div class=' w-full flex items-center my-4 px-2'>
	
<Pagination.Root class=' text-white' count={data.totalPages * 20} perPage={20} let:pages let:currentPage={currentPage} siblingCount={1} page={Number($page.params.page_number)}>
<Pagination.Content>
  <Pagination.Item >
	<Pagination.PrevButton on:click={()=>nextOrPrev('previous')}/>
  </Pagination.Item>
  {#each pages as page (page.key)}
	{#if page.type === "ellipsis"}
	  <Pagination.Item >
		<Pagination.Ellipsis />
	  </Pagination.Item>
	{:else}

	  <Pagination.Item class={page.value=== currentPage?` text-black`:``}>
		<a href={`/${page.value}`}  data-sveltekit-preload-data="false">
			<Pagination.Link {page} isActive={currentPage == page.value}>
		  {page.value}
		</Pagination.Link>
	</a>
	  </Pagination.Item>
	  {/if}
	  {/each}
	<Pagination.NextButton on:click={()=>nextOrPrev('next')}/>

	</Pagination.Content>
</Pagination.Root>
  </div>