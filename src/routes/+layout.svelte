<script lang="ts">
	import '../app.pcss';
	import * as Card from '$lib/components/ui/card'
	import  {Input} from '$lib/components/ui/input/';
	import { Search } from 'lucide-svelte';
	import SearchListItems from './SearchListItems.svelte';
		
		let query='';
		let processedSearchResultArray:{id:number, backdrop_path:string,media_type:'tv'|'mvoie',original_name:string,original_title:string}[];
		let errorHasOccured = false
		let queryResultsReady = false
		let searching = false


async function search(){

searching=true 
let searchrequest = await fetch('/search',
{
	method:'POST',
	body:JSON.stringify(query),
	headers:{
		'content-type': 'application/json'
	}
})
try {
	let searchResponse = await searchrequest.json()
	processedSearchResultArray = searchResponse.processedSearchResultArray
		queryResultsReady = true
		searching=false
} catch (error) {
		errorHasOccured=true
	searching = false
}
 }
$:if(query===''){
	processedSearchResultArray=[]
	queryResultsReady=false
}
</script>

<header class=" sticky w-screen h-[7vh]  top-0 z-20   bg-[hsl(240 10% 3.9%)] backdrop-blur-md flex justify-evenly items-center ">
	
	<div class=''> 
		<span class=" sticky top-[10%] text-xl text-orange-400 font-DmSans font-bold ">Movie-Box</span>
	</div>

	<div class=" flex flex-col space-y-3 rounded-md relative w-[60%] h-[5vh] sm:w-[50%]">
		<div class=" w-full h-full flex">
			<Input type='search' class=' w-[90%] h-full rounded-l-md outline-none' bind:value={query} placeholder='Search for movies and series'/>
			<button class=" w-[10%] rounded-r-md h-full flex items-center justify-center" on:click={search}><Search color={'white'}/></button>
		</div>
		{#if searching}
		<Card.Root class=' z-50 w-[100%]'>
			<Card.Header class=' p-2'>
				<Card.Title class=' font-Poppins'>Searching...</Card.Title>
			</Card.Header>
				
		</Card.Root>
		{/if}
		{#if queryResultsReady && searching===false && query!==''}
			<Card.Root class=' z-50 w-[100%]'>
				<Card.Header class=' p-2'>
					<Card.Title class=' font-Poppins'>Search Results</Card.Title>
				</Card.Header>
					<Card.Content class=' flex flex-col space-y-2 p-1'>
						{#if processedSearchResultArray.length !== 0 }
						{#each processedSearchResultArray as items}
							<SearchListItems on:onselect={()=>{query='';processedSearchResultArray=[]}} backdrop_path={items.backdrop_path} name={items.original_name?items.original_name:items.original_title} variant={items.media_type} id={items.id} />
						{/each}
						{/if}
					</Card.Content>
			</Card.Root>
		{/if}
		{#if errorHasOccured && searching===false}
		<Card.Root class=' z-50 w-[100%]'>
			<Card.Header class=' p-2'>
				<Card.Title class='font-sm' >Search Failed,Try another keyword or check your internet connection </Card.Title>

				</Card.Header>
		</Card.Root>
		{/if}
	</div>
		
	</header>

	<slot />

	<footer class=" h-[10vh] w-screen flex flex-col items-center justify-center ">
        <span class='flex   space-x-5 font-bold text-sm text-white'>
        <p>Conditions of Use</p>
        <p>Privacy - Policy</p>
        <p>Press Room</p>
        </span>
        <small class=' text-gray-400'>&copy2024 MovieBox by Nwabuisi Chike</small>
	</footer>
