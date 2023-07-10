<script>
    export let data;
</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
    <div class="flex items-center justify-between">
        <h3 class="h3 font-bold">Dashboard</h3>
    </div>
    <div class="grid grid-cols-3 gap-6">
        <div class="card p-4">
            <p class="h3">{data.user.name}</p>
            <a class="hover:cursor-pointer hover:variant-soft" target="_blank" href={`https://www.recipio.fr/${data.user.username}`}>
                {`recipio.fr/${data.user.username}`}
            </a>
        </div>

        <div class="card p-4">
            <p class="text-3xl font-bold">{data.recipes.length}</p>
            <p>Recipes</p>
        </div>
    </div>
</div>

