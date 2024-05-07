
<script lang='ts'>
    import { imageBase } from '$lib';
    import { goto } from '$app/navigation'
    export let backdrop_path =''
    export let name =''
    export let variant = 'movie'
    export let id =1
    export let mode:'normal'|'placeholder'|'failed'
    import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function closeSearch(){
    dispatch('onselect')
    goto(variant==='movie'?`/movies/${id}`:`/series/${id}`)

}
</script>

{#if mode==='normal'}
<div class=" flex  hover:cursor-pointer " on:click={closeSearch}>
    <div class=" w-[20%] h-[15%] flex-shrink-0">
        <img class=" object-fill w-full h-full rounded-md" src={`${imageBase}${backdrop_path}`} alt="">
    </div>
    <div class=" w-[65%] text-sm">
        <p class=' w-full truncate text-sm pl-2'>{name}</p>
    </div>
    <div class=" w-[10%] text-xs sm:text-base">
        <small>{variant==='tv'?'serie':'movie'}</small>
    </div>
</div>

{/if}
     