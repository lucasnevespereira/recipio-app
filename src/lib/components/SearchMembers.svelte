<script lang="ts">
    import {Autocomplete} from '@skeletonlabs/skeleton';
    import type {AutocompleteOption} from '@skeletonlabs/skeleton';
    import {pb} from '$lib/pocketbase';

    export let searchQuery = '';
    export let selectedMembers: AutocompleteOption[] = [];
    let membersOptions: AutocompleteOption[] = [];

    $: {
        if (searchQuery !== '') {
            fetchUsers();
        }
    }

    async function fetchUsers() {
        if (searchQuery) {
            try {
                const response = await pb.collection('users').getFullList({
                    sort: '-created',
                    filter: `username ~ "${searchQuery.toLowerCase()}"`,
                });
                membersOptions = response.map(member => (
                    {
                        label: member.username,
                        value: member.id,
                        meta: {email: member.email, avatar: member.avatar, collectionId: member.collectionId}
                    }
                ));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        } else {
            membersOptions = [];
        }
    }


    const addMember = event => {
        const member = event.detail;
        // If member is not in the list, add them
        if (!selectedMembers.some(m => m.value === member.value)) {
            selectedMembers = [...selectedMembers, member];
        }
    };
</script>

<span class="text-xl font-semibold">Select Users to join</span>
<input class="input mb-3" type="text" bind:value={searchQuery} placeholder="Search users"/>
<Autocomplete bind:input={searchQuery} options={membersOptions} on:selection={addMember}/>
