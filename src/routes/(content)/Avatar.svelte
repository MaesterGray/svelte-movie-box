<script lang='ts'>
    import { imageBase } from "$lib";
    import * as Avatar from '$lib/components/ui/avatar'
    export let profile_path
    export let original_name
    export let character ='none'

</script>

<div class=" flex flex-col w-[33%] lg:w-[25%] aspect-square flex-shrink-0 items-center justify-center">
    <Avatar.Root class=' '>
        <Avatar.Image src={`${imageBase}${profile_path}`} alt={`picture of ${original_name}`} />
        <Avatar.Fallback class='w-[6vw]'>CN</Avatar.Fallback>
    </Avatar.Root>
    <p class=" flex flex-col truncate w-[90%] ">
        <small class=' text-center'>{original_name}</small>
        {#if character !== 'none'}
        <small class=' text-center text-xs'>as </small>
        <small class=" text-center ">{character}</small>
        {/if}
      
    </p>
</div>