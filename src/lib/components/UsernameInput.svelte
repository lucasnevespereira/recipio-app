<script lang="ts">
    import {pb} from "$lib/pocketbase";
    import {writable} from 'svelte/store';

    export let value = '';
    export let placeholder = '';
    export let id;
    export let label;
    export let type = 'text';
    export let disabled = false;
    export let required = false;

    export let showLabel = false;

    export let errors;

    const usernameAvailable = writable(false);
    let userNameValue = ''


    const checkUsernameAvailability = async (event) => {
        userNameValue = event.target.value.toString().toLowerCase()
        try {
            const record = await pb.collection('users').getFirstListItem(`username="${userNameValue}"`);
            if (record) {
                usernameAvailable.set(false);
            }
        } catch (e: any) {
            // username is available
            if (e.status === 404) {
                usernameAvailable.set(true)
            } else {
                console.error('Error checking username availability:', e)
            }
        }

    }


</script>

{#if showLabel}
    <label for={id} class="label font-medium pb-1">
        <span class="label-text">{label}</span>
    </label>
{/if}
<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
    <div class="input-group-shim">recipio.fr/</div>
    <input
            {type}
            {placeholder}
            {required}
            {disabled}
            {id}
            name={id}
            {value}
            on:input={checkUsernameAvailability}
    />
</div>
{#if userNameValue.length > 0}
    {#if $usernameAvailable}
        <p style="color: green">{userNameValue} is available</p>
    {:else}
        <p style="color: red">{userNameValue} is not available</p>
    {/if}
{/if}
{#if errors}
    {#each errors as error}
        <small class="label-text-alt text-red-600">
            {error}
        </small>
    {/each}
{/if}