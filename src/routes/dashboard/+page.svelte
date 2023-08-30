<script>
    export let data;
</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
    <div class="flex items-center justify-between">
        <h3 class="h3 font-bold">Dashboard</h3>
    </div>
    <div class="grid lg:grid-cols-3 lg:grid-rows-2 grid-cols-1 grid-rows-2 gap-6">
        <div class="card p-4">
            {#if data.user.name}
                <p class="h3">{data.user.name}</p>
            {:else }
                <p class="h3">{data.user.username}</p>
            {/if}
            <a class="hover:cursor-pointer hover:variant-soft" target="_blank"
               href={`https://www.recipio.fr/${data.user.username}`}>
                {`recipio.fr/${data.user.username}`}
            </a>
        </div>

        <div class="card p-4">
            <p class="text-3xl font-bold">{data.recipes.length}</p>
            {#if data.recipes.length > 1}
                <p>Recipes</p>
            {:else}
                <p>Recipe</p>
            {/if}
        </div>

        <div class="card p-4">
            <p class="text-3xl font-bold">{data.families.length}</p>
            {#if data.families.length > 1}
                <p>Families</p>
            {:else}
                <p>Family</p>
            {/if}
        </div>
    </div>
</div>


