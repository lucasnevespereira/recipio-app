<script lang="ts">
    import {drawerStore} from '@skeletonlabs/skeleton';

    function drawerClose(): void {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4">
    <ul>
        <li><a href="/dashboard/recipes" on:click={drawerClose}>Recipes</a></li>
        <li><a href="/dashboard/profile" on:click={drawerClose}>Profile</a></li>
        <li><a href="/dashboard/families" on:click={drawerClose}>Families</a></li>
    </ul>
</nav>