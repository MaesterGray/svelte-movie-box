<script lang='ts'>
    import { imageBase } from "$lib";
    import * as Avatar from '$lib/components/ui/avatar'
    export let profile_path
    export let original_name
    export let character ='none'

</script>

<div class=" flex flex-col w-[33%] lg:w-[25%] aspect-square flex-shrink-0 items-center justify-center">
    <Avatar.Root class=' h-[100%] w-full static justify-center rounded-none '>
        <Avatar.Image class=' object-cover w-full h-full rounded-md ' src={`${imageBase}${profile_path}`} alt={`picture of ${original_name}`} />
        <Avatar.Fallback class='h-full w-full  text-center rounded-md bg-black'>Image unavailable</Avatar.Fallback>
    </Avatar.Root>
    <p class=" flex flex-col truncate w-[90%] mt-1 mb-1">
        <small class=' text-center'>{original_name}</small>
        {#if character !== 'none'}
        <small class=' text-center text-xs'>as </small>
        <small class=" text-center ">{character}</small>
        {/if}
      
    </p>
</div>