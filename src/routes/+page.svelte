<script lang="ts">
    import { Icon, PlusCircle, Share, UserCircle} from "svelte-hero-icons";
    let currentYear = new Date().getFullYear();
</script>

<section class="hero-section flex flex-col items-center justify-center h-screen text-white">
    <div class="filter"></div>
    <div class="text-center">
        <h2 class="text-4xl font-bold mb-2">Discover and Share Flavors</h2>
        <p class="text-lg text-gray-300 mb-4">Unveil Culinary Traditions with Recipio</p>
        <a href="/auth/signup" class="btn variant-filled">Create an Account</a>
        <p class="mt-4">or <a href="/auth/login" class="text-primary font-bold">login</a> to access your Dashboard</p>
    </div>
</section>
<div class="mx-auto gap-8 pt-5">
    <!-- Section 2: Text and SVG Mockup -->
    <section class="flex items-center px-5 py-16 lg:py-20">
        <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            <div class="lg:w-1/2 text-center lg:text-left">
                <h2 class="text-4xl font-bold text-primary mb-4">Unveil Your Culinary Creations</h2>
                <p class="text-gray-700 leading-relaxed mb-6">Embrace your inner chef with Recipio! Upon joining our vibrant culinary community, your cooking journey takes center stage. Your creations deserve to be celebrated, which is why we offer a personalized public profile exclusively for you.</p>
                <p class="text-gray-700 leading-relaxed mb-6">Imagine sharing your passion for cooking with the world. As you curate your recipes, they seamlessly find a home on your public profile. And here's the best part: your profile link is as simple as <span class="font-semibold">recipio.fr/username</span>.</p>
                <p class="text-gray-700 leading-relaxed">Ready to showcase your culinary artistry?</p>
            </div>
            <div class="mt-10 lg:mt-0 flex justify-center relative">
                <img src="/images/phone-mockup.png" alt="iPhone Mock" class="iphone-mockup w-2/3 lg:w-3/4 max-w-sm h-auto rounded-lg"/>
            </div>
        </div>
    </section>


    <!-- Section 3: Services Description -->

    <section class="services-section">
        <div class="banner"></div>
        <div class="container mx-auto text-center py-16">
            <h3 class="text-3xl font-semibold mb-8">Our Functionalities</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="bg-white/75 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <Icon src={UserCircle} class="w-12 h-12 mb-4" alt="Create Account Icon"/>
                    <h4 class="text-xl font-semibold mb-2">Create an Account</h4>
                    <p class="text-gray-600">Join our culinary community by creating a personalized account to access all the features.</p>
                </div>
                <div class="bg-white/75 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <Icon src={PlusCircle} class="w-12 h-12 mb-4" alt="Create Account Icon"/>
                    <h4 class="text-xl font-semibold mb-2">Create Recipes</h4>
                    <p class="text-gray-600">Craft and share your favorite recipes, showcasing your culinary creativity to the world.</p>
                </div>
                <div class="bg-white/75 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <Icon src={Share} class="w-12 h-12 mb-4" alt="Create Account Icon"/>
                    <h4 class="text-xl font-semibold mb-2">Share Your Creations</h4>
                    <p class="text-gray-600">Connect with food enthusiasts and share your culinary creations across the community.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 4: Another Image and Texts -->
    <section class="stepper-section flex flex-col">
        <div class="banner"></div>
        <div class="container mx-auto text-center py-16">
            <h3 class="text-3xl font-semibold mb-8">Start Sharing Your Culinary Journey</h3>
            <div class="mx-auto">
                <p class="text-gray-600">Embark on a culinary adventure with Recipio. Share your recipes, connect with fellow food enthusiasts, and create a digital legacy of your culinary creations. Join our community today and celebrate the art of cooking like never before.</p>
                <a href="/auth/signup" class="btn variant-filled mt-4">Get Started</a>
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

    .stepper-section .banner {
        background-image: url("https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format");
    }

</style>
