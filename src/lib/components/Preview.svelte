<script>
    import {getImageURL} from "$lib/utils/image";

    export let user;
</script>
<div class="min-h-full w-full bg-accent border-4 overscroll-y-auto">
    <main class="py-4">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="flex flex-col justify-center pt-10 container text-2xl space-y-2">
                <div class="avatar">
                    <div class="w-32 rounded-full">
                        <img
                                src={user?.avatar
							? getImageURL(user?.collectionId, user?.id, user?.avatar)
							: `https://ui-avatars.com/api/?name=${user?.username}&background=9294F5`}
                                alt="User avatar"/>
                    </div>
                </div>
                <div>
                    <h1 class="font-bold">{user.name}</h1>
                    <small>@{user.username}</small>
                </div>
            </div>
        </div>
    </main>
</div>