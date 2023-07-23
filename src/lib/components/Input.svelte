<script lang="ts">
    export let value = '';
    export let placeholder = '';
    export let id;
    export let label;
    export let type = 'text';
    export let disabled = false;
    export let required = false;

    export let showLabel = false;

    export let errors;
</script>

{#if showLabel}
    <label for={id} class="label font-medium pb-1">
        <span class="label-text">{label}</span>
    </label>
{/if}
<input
        class="input input-bordered"
        {type}
        {placeholder}
        {required}
        {disabled}
        {id}
        name={id}
        {value}
/>

{#if errors}
    {#each errors as error}
        <small class="label-text-alt text-red-600">
            {error}
        </small>
    {/each}
{/if}