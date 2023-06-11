<script>
    import {getImageURL} from "$lib/utils/image";

    export let data;
    const {user} = data;
</script>

<div class="flex flex-col items-center pt-10 text-2xl space-y-2 mb-4 sm:mb-2">
    <a href={`/${user.username}`}>
        <div class="w-16 h-16 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full overflow-hidden hover:cursor-pointer">
            <img
                    class="w-full h-full object-cover"
                    src={user?.avatar ? getImageURL(user?.collectionId, user?.id, user?.avatar) : `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt="User avatar"
            />
        </div>
    </a>
    <div class="flex flex-col">
        <span class="text-sm md:text-lg lg:text-2xl font-bold text-center">{user.name}</span>
        <span class="text-sm md:text-lg lg:text-2xl text-center text-gray-600 mt-0">@{user.username}</span>
    </div>
</div>

<div class="w-full sm:p-0 md:p-1 lg:p-5">
    <slot/>
</div>