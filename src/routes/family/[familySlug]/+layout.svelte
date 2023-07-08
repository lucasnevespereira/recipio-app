<script>
    export let data;
    const {family} = data;

</script>

<div class="flex flex-col items-center pt-10 text-2xl space-y-2 mb-4 sm:mb-2">
    <h2 class="h2">{family.name}</h2>
</div>

<div class="w-full sm:p-0 md:p-1 lg:p-5" style="min-height: 60%">
    <slot/>
</div>

<footer class="inset-x-0 bottom-0 h-16 mt-5">
    <div class="max-w-screen-lg mx-auto flex items-center justify-center">
        <a href="/" target="_blank" class="flex items-center justify-center">
            <img class="w-6 h-6" src="/logo-transparent.png" alt="logo">
            <p class="text-base font-bold">Recipio</p>
        </a>
    </div>
</footer>