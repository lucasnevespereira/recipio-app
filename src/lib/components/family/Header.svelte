<script>
    export let family;
    let isMenuOpen = false;
</script>

<div class="bg-surface-200 h-16 sticky top-0 w-full z-50">
    <nav class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <!-- Family Name as Logo -->
        <a href={`/family/${family.slug}`} class="text-2xl font-bold text-secondary">{family.page_title}</a>

        <!-- Desktop menu items -->
        <div class="hidden lg:flex lg:space-x-4">
            <a href={`/family/${family.slug}`}
               class="text-primary px-3 py-2 rounded-md text font-medium">{family.menu_recipes_name}</a>
            <a href={`/family/${family.slug}/about`}
               class="text-primary px-3 py-2 rounded-md text font-medium">{family.menu_about_name}</a>
        </div>

        <!-- Burger menu icon (hamburger) -->
        <button on:click={() => isMenuOpen = !isMenuOpen} class="lg:hidden">
            <svg class="h-6 w-6 fill-current text-primary" viewBox="0 0 24 24">
                <path d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            </svg>
        </button>
    </nav>
    <!-- Mobile menu dropdown -->
    {#if isMenuOpen}
        <div class="lg:hidden bg-surface-200 pt-2 z-60 pb-4 shadow-md">
            <div class="px-2 space-y-1 sm:px-3">
                <a href={`/family/${family.slug}`}
                   class="text-primary block px-3 py-2 rounded-md text-base font-medium">{family.menu_recipes_name}</a>
                <a href={`/family/${family.slug}/about`}
                   class="text-primary block px-3 py-2 rounded-md text-base font-medium">{family.menu_about_name}</a>
            </div>
        </div>
    {/if}
</div>
