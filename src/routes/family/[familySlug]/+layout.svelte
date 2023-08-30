<script>
    import Footer from "$lib/components/family/Footer.svelte";
    import Header from "$lib/components/family/Header.svelte";
    export let data;
</script>

<div class="flex flex-col min-h-screen">
    <Header family={data.family}/>

    <div class="flex-grow">
        <slot/>
    </div>

    <Footer/>
</div>
