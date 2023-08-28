<script>
    import {onDestroy} from 'svelte';

    export let isOpen = false;

    export let loading = false;

    export let width = 'w-32'
    export let top = "20px";
    export let right = "20px"
    export let additionalClasses = "";
    export let handleClose; // New prop for handling close

    function handleClickOutside(node) {
        const clickOutsideHandler = e => {
            if (isOpen && !node.contains(e.target) && handleClose) {
                handleClose(); // Use the provided handleClose function
            }
        };

        window.addEventListener('click', clickOutsideHandler);

        onDestroy(() => {
            window.removeEventListener('click', clickOutsideHandler);
        });

        return {
            destroy() {
                window.removeEventListener('click', clickOutsideHandler);
            }
        };
    }
</script>


<div use:handleClickOutside class="popup-container" on:click|stopPropagation>
    {#if isOpen}
        {#if loading}
            <div class="flex justify-center items-center py-2 px-4 rounded-full w-full bg-gray-300">
                <div class="loader"></div>
            </div>
        {:else}
            <div class={`absolute z-10 rounded card ${width} shadow-xl mt-2 p-2 ${additionalClasses}`}
                 style={`top: ${top}; right: ${right};`}>
                <slot></slot>
            </div>
        {/if}
    {/if}
</div>

