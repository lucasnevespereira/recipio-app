<script lang="ts">
    import {Icon, PlusCircle, Share, UserCircle, Users} from "svelte-hero-icons";
    let currentYear = new Date().getFullYear();
    export let data;
</script>

<svelte:head>
    <title>{`Recipio`}</title>
    <meta property="og:title" content={`Recipio`}>
    <meta property="og:description" content={"Unveil Culinary Traditions with Recipio"}>
    <meta property="og:image" content={"/logo.png"}>
    <meta property="og:url" content={"https://www.recipio.fr"}>
    <meta property="og:site_name" content={"Recipio"}>

    <meta property="whatsapp:title" content={"Recipio"}>
    <meta property="whatsapp:description" content={"Unveil Culinary Traditions with Recipio"}>
    <meta property="whatsapp:image"
          content={"/logo.png"}>
</svelte:head>

<section class="hero-section flex flex-col items-center justify-center h-screen text-white">
    <div class="filter"></div>
    <div class="text-center">
        <h2 class="text-4xl font-bold mb-2">Your Digital Cookbook</h2>
        <p class="text-lg text-gray-300 mb-4">Unveil Culinary Traditions with Recipio</p>
        {#if data.user}
            <a href="/dashboard" class="btn variant-filled">Access Dashboard</a>
        {:else}
            <a href="/auth/signup" class="btn variant-filled">Create an Account</a>
            <p class="mt-4">or <a href="/auth/login" class="text-primary font-bold">login</a> to access your Dashboard
            </p>
        {/if}
    </div>
</section>
<div class="mx-auto gap-8 pt-5">
    <!-- Section 2: Personal Page Section-->
    <section class="flex items-center px-5 py-16 lg:py-20">
        <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            <div class="lg:w-1/2 text-center lg:text-left">
                <h2 class="text-4xl font-bold text-primary mb-4">Unveil Your Culinary Creations</h2>
                <p class="text-gray-700 leading-relaxed mb-6">Embrace your inner chef with Recipio! Upon joining our
                    vibrant culinary community, your cooking journey takes center stage. Your creations deserve to be
                    celebrated, which is why we offer a personalized public profile exclusively for you.</p>
                <p class="text-gray-700 leading-relaxed mb-6">Imagine sharing your passion for cooking with the world.
                    As you curate your recipes, they seamlessly find a home on your public profile. And here's the best
                    part: your profile link is as simple as <span class="font-semibold">recipio.fr/username</span>.</p>

                <!-- Key reasons to create a Recipio profile -->
                <h3 class="text-2xl font-semibold text-primary mb-4 mt-6">Why Create a Recipio Profile?</h3>
                <ul class="list-disc list-inside mb-4">
                    <li class="text-gray-700 leading-relaxed">Get a dedicated spot for all your recipes, from family
                        secrets to new experiments.
                    </li>
                    <li class="text-gray-700 leading-relaxed">No more messy handwritten notes. Keep all your recipes
                        organized and digital.
                    </li>
                    <li class="text-gray-700 leading-relaxed">Share recipes with just a link, no more copying or
                        retyping for friends and family.
                    </li>
                </ul>

                <p class="text-gray-700 leading-relaxed">Ready to showcase your culinary artistry?</p>
                <a href="/auth/signup" class="btn variant-filled mt-4">Start Your Journey</a>
            </div>
            <div class="mt-10 lg:mt-0 flex justify-center relative">
                <img src="/images/phone-mockup.png" alt="iPhone Mock"
                     class="iphone-mockup w-2/3 lg:w-3/4 max-w-sm h-auto rounded-lg"/>
            </div>
        </div>
    </section>


    <!-- Section 3: Services Description -->

    <section class="services-section">
        <div class="banner"></div>
        <div class="container mx-auto text-center py-16">
            <h3 class="text-3xl font-semibold mb-8">Our Functionalities</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                <div class="bg-white/75 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <Icon src={UserCircle} class="w-12 h-12 mb-4" alt="Create Account Icon"/>
                    <h4 class="text-xl font-semibold mb-2">Create an Account</h4>
                    <p class="text-gray-600">Join our culinary community by creating a personalized account to access
                        all the features.</p>
                </div>
                <div class="bg-white/75 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <Icon src={PlusCircle} class="w-12 h-12 mb-4" alt="Create Account Icon"/>
                    <h4 class="text-xl font-semibold mb-2">Create Recipes</h4>
                    <p class="text-gray-600">Craft and share your favorite recipes, showcasing your culinary creativity
                        to the world.</p>
                </div>
                <div class="bg-white/75 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <Icon src={Share} class="w-12 h-12 mb-4" alt="Create Account Icon"/>
                    <h4 class="text-xl font-semibold mb-2">Share Your Creations</h4>
                    <p class="text-gray-600">Connect with food enthusiasts and share your culinary creations across the
                        community.</p>
                </div>
                <div class="bg-white/75 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <Icon src={Users} class="w-12 h-12 mb-4" alt="Family Icon"/>
                    <h4 class="text-xl font-semibold mb-2">Create Family Recipe Pages</h4>
                    <p class="text-gray-600">Initiate a family tradition by curating a unique recipe page. Add members
                        and keep the legacy of family recipes alive.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 4: Family Recipes & Members -->
    <section class="family-section flex flex-col bg-white/75 py-16">
        <div class="container mx-auto text-center">
            <h3 class="text-3xl font-semibold mb-12">Build & Cherish Your Family's Culinary Legacy</h3>

            <!-- Benefits Typography -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <div class="space-y-4">
                    <h4 class="text-xl font-medium">Preserve Generations</h4>
                    <p class="text-gray-600">Protect and cherish your culinary knowledge for future generations.</p>
                </div>

                <div class="space-y-4">
                    <h4 class="text-xl font-medium">Private Family Space</h4>
                    <p class="text-gray-600">A dedicated space for family members to share and discover recipes.</p>
                </div>

                <div class="space-y-4">
                    <h4 class="text-xl font-medium">Strengthen Bonds</h4>
                    <p class="text-gray-600">Unite your family through shared cooking experiences and stories.</p>
                </div>

                <div class="space-y-4">
                    <h4 class="text-xl font-medium">Anywhere Access</h4>
                    <p class="text-gray-600">Retrieve your cherished recipes whenever you want, from wherever you
                        are.</p>
                </div>
            </div>

            <!-- Image and Quote -->
            <div class="flex flex-col md:flex-row items-center justify-between my-12 space-y-8 md:space-y-0">
                <img src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80"
                     alt="Family cooking together" class="w-full md:w-1/2 rounded shadow-md">

                <!-- Quote -->
                <div class="w-full md:w-1/2 md:pl-10">
                    <blockquote class="font-serif text-2xl italic text-gray-700 border-l-4 pl-4 border-surface-500">
                        "Every recipe tells a story. From grandma's famous pie to your twist on a traditional dish,
                        Recipio helps you share it with the world."
                    </blockquote>
                </div>
            </div>

            <!-- Steps using Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div class="p-6 rounded shadow-md bg-white">
                    <h4 class="font-medium text-xl mb-4">1. Set up your family page</h4>
                    <p>Choose a custom name and share your story.</p>
                </div>

                <div class="p-6 rounded shadow-md bg-white">
                    <h4 class="font-medium text-xl mb-4">2. Invite your family</h4>
                    <p>Let them join using their Recipio accounts.</p>
                </div>

                <div class="p-6 rounded shadow-md bg-white">
                    <h4 class="font-medium text-xl mb-4">3. Start adding recipes</h4>
                    <p>Tag them to the family page and cherish your culinary legacy.</p>
                </div>

                <div class="p-6 rounded shadow-md bg-white">
                    <h4 class="font-medium text-xl mb-4">4. Collaborate and Grow</h4>
                    <p>Let members contribute and watch your unique collection expand.</p>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center">
                <p class="text-gray-600 leading-relaxed mb-6">Be part of the growing community preserving and
                    celebrating their culinary heritage with Recipio.</p>
                <a href="/auth/signup" class="btn variant-filled">Get Started</a>
            </div>
        </div>
    </section>

    <footer class="bg-surface-900 text-white py-6">
        <div class="container mx-auto text-center">
            <p class="text-sm">© {currentYear} Recipio. All rights reserved.</p>
        </div>
    </footer>
</div>

<style>
    .hero-section {
        position: relative;
        background-image: url("https://images.unsplash.com/photo-1556909211-36987daf7b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        backdrop-filter: brightness(0.2);
    }

    .hero-section .filter {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        top: 0;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .banner {
        height: 300px;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .services-section .banner {
        background-image: url("https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80");
    }

    /*.family .banner {*/
    /*    background-image: url("https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format");*/
    /*}*/

</style>
