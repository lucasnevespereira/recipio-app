<script lang="ts">
    import {Autocomplete} from '@skeletonlabs/skeleton';
    import type {AutocompleteOption} from '@skeletonlabs/skeleton';
    import {pb} from '$lib/pocketbase';

    export let searchQuery = '';
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
                    filter: `username ~ "${searchQuery.toLowerCase()}"`
                });
                membersOptions = response.map(member => (
                    {
                        label: member.username,
                        value: member.id,
                        meta: {email: member.email}
                    }
                ));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        } else {
            membersOptions = [];
        }
    }

    const addMember = member => {
        console.log(member.detail.meta.email)
        //send email
        // if (!selectedMembers.includes(member)) {
        //     selectedMembers = [...selectedMembers, member];
        // }
    };
</script>

<span>Add members</span>
<input class="input mb-3" type="text" bind:value={searchQuery} placeholder="Search users"/>
<Autocomplete bind:input={searchQuery} options={membersOptions} on:selection={addMember}/>
