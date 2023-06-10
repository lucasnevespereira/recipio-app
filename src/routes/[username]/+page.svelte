<script>
    import {getImageURL} from "$lib/utils/image";

    export let data;
    const {user} = data
</script>

<div class="flex flex-col justify-center pt-10 container text-2xl space-y-2">
    <div class="avatar">
        <div class="w-32 rounded-full">
            <img
                    src={user?.avatar
							? getImageURL(user?.collectionId, user?.id, user?.avatar)
							: `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt="User avatar"/>
        </div>
    </div>
    <div>
        <h1 class="font-bold">{user.name}</h1>
        <small>@{user.username}</small>
    </div>
</div>
