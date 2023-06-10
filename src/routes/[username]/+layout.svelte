<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 20px;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .profile-name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .profile-username {
        font-size: 18px;
        color: #888;
    }

    .recipe-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 20px;
        justify-items: center;
    }

    .recipe-card {
        width: 200px;
        height: 200px;
        background-color: #f3f3f3;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .recipe-card:hover {
        transform: scale(1.05);
    }

    .recipe-card img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }

    .recipe-name {
        margin-top: 8px;
        font-size: 16px;
        text-align: center;
    }
</style>

<script>
    import {getImageURL} from "$lib/utils/image";
    import {goto} from "$app/navigation";

    export let data;
    const {user} = data;
</script>

<div class="flex flex-col items-center pt-10 text-2xl space-y-2 mb-6">
    <a href={`/${user.username}`}>
        <div class="w-32 h-32 rounded-full overflow-hidden hover:cursor-pointer">
            <img
                    class="w-full h-full object-cover"
                    src={user?.avatar ? getImageURL(user?.collectionId, user?.id, user?.avatar) : `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt="User avatar"
            />
        </div>
    </a>
    <div>
        <h1 class="text-2xl font-bold">{user.name}</h1>
        <small class="text-gray-600">@{user.username}</small>
    </div>
</div>

<div class="w-full p-3">
    <slot/>
</div>

