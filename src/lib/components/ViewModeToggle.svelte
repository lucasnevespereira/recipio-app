<script>
    import {Icon, Photo, ListBullet} from "svelte-hero-icons";

    export let viewMode;

    function setViewMode(mode) {
        viewMode = mode;
        localStorage.setItem('viewMode', mode);
    }
</script>

<div class="max-w-[900px] mb-4 mx-auto flex justify-center lg:justify-end">
    <button on:click={() => setViewMode('gallery')} class="view-mode-btn {viewMode === 'gallery' ? 'text-black' : ''}">
        <Icon src={Photo} class="w-6"/>
    </button>
    <button on:click={() => setViewMode('list')} class="view-mode-btn {viewMode === 'list' ? 'text-black' : ''}">
        <Icon src={ListBullet} class="w-6"/>
    </button>
</div>

<style>
    .view-mode-btn {
        padding: 8px;
        border: none;
        background: transparent;
        cursor: pointer;
        transition: transform 0.3s, color 0.3s;
    }
</style>
