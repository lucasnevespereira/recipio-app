<script>
    import {getImageURL} from "$lib/utils/image";

    export let data;
    const {user} = data;

</script>

<div class="flex flex-col items-center pt-10 text-2xl space-y-2 mb-4 sm:mb-2">
    <a href={`/${user.username}`}>
        <div class="w-24 h-24 lg:h-32 lg:w-32 rounded-full overflow-hidden hover:cursor-pointer">
            <img
                    class="w-full h-full object-cover"
                    src={user?.avatar ? getImageURL(user?.collectionId, user?.id, user?.avatar) : `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt="User avatar"
            />
        </div>
    </a>
    <div class="flex flex-col">
        <span class="text-sm md:text-lg lg:text-2xl font-bold text-center">{user.name}</span>
        <small class="text-sm md:text-sm lg:text-md text-center text-gray-600 mt-0">@{user.username}</small>
    </div>
</div>

<div class="w-full sm:p-0 md:p-1 lg:p-5" style="min-height: 60%">
    <slot/>
</div>

<footer class="inset-x-0 bottom-0 h-16 mt-5">
    <div class="max-w-screen-lg mx-auto flex items-center justify-center">
        <a href="/" target="_blank" class="flex items-center justify-center">
            <img class="w-6 h-6" src="/logo-transparent.png" alt="logo">
            <p class="text-base font-bold">Recipio</p>
        </a>
    </div>
</footer>