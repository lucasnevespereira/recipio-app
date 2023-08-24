<script>
    import {getImageURL} from "$lib/utils/image";
    import {Avatar} from "@skeletonlabs/skeleton";

    export let userId;
    export let collectionId;
    export let avatar;
    export let username;
    export let width = "w-10";

</script>

{#if avatar}
    <Avatar src={getImageURL(collectionId, userId, avatar)} width={width}/>
{:else}
    <Avatar initials={username} width={width}/>
{/if}
