<script>
	// @ts-ignore
	import Button from '$lib/components/ui/button/button.svelte';
	//@ts-ignore
	import * as Carousel from '$lib/components/ui/carousel/index.ts';
	// @ts-ignore
	import * as Card from '$lib/components/ui/card/index.ts';
	// @ts-ignore
	import * as Pagination from '$lib/components/ui/pagination/';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import { mediaQuery } from 'svelte-legos';
	import { getEmblaContext } from '$lib/components/ui/carousel/context.js';
	import { onMount } from 'svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte'
    import Autoplay from 'embla-carousel-autoplay'
	const { scrollNext, canScrollNext } = getEmblaContext('<Carousel.Next/>');
	let moviesOrSeries = 'Movies';
	// @ts-ignore
	export let data;
	const imageBase = 'https://image.tmdb.org/t/p/original/';

	// onMount(()=>{
	// 	const timer = setInterval(()=>{scrollNext()},3000)
	// })
	const isDesktop = mediaQuery('(min-width: 768px)');
	let count = $state(44)
	console.log(count)
</script>

<main>
	<header></header>
	<section class=" flex items-center justify-center">
		<Carousel.Root class="w-full overflow-x-hidden">
			<Carousel.Content >
				{#each data.trendingMovies as item, i}
					<Carousel.Item>
						<div class=" p-1">
							<Card.Root>
								<Card.Content
									class="flex aspect-video items-center justify-center rounded-md bg-black p-6 text-white"
								>
									<img src={`${imageBase}${item.backdrop_path}`} alt="" />
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Next class=" right-5" on:click={() => {}} />
			<Carousel.Previous class=" left-5" on:click={() => {}} />
		</Carousel.Root>
	</section>
	<div class=" flex h-10 w-screen items-center justify-center space-x-2">
		<span>Movies</span>
		<span>Series</span>
	</div>
	<section class=" flex w-screen flex-wrap justify-center gap-4 md:gap-5">
		{#if moviesOrSeries === 'Movies'}
			{#each data.movies.movies as movie}
				<Card.Root class=" flex aspect-[9/16] w-[45vw] rounded-lg  md:w-[15vw]">
					<Card.Content class="rounded-md  bg-black p-6">
						<div class=" flex flex-col">
							<div class=" aspect-square w-[45vw] rounded-lg md:w-[15vw]">
								<img
									class=" object-full h-full w-full rounded-t-lg"
									src={`${imageBase}${movie.backdrop_path}`}
									alt=""
								/>
							</div>
							<p class=" flex w-full flex-col text-white">
								<span>{movie.release_date}</span>
								<span>{movie.title}</span>
								<span>{movie.vote_average}</span>
								<span></span>
							</p>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		{/if}
		<!-- {#each  as }
            
        {/each} -->
	</section>
</main>
