<script>
    import DynamicHTML from "$lib/components/DynamicHTML.svelte";

    export let data;
</script>

<div class="mt-10 sm:mt-20 mb-10 px-4 z-10">
    <h3 class="h3 font-semibold text-primary text-center mb-6">{data.family.about_title}</h3>
    <div class="max-w-[900px] mx-auto text-secondary">
        <div class="mb-4 leading-relaxed">
            <DynamicHTML htmlContent={data.family.about_content}/>
        </div>
    </div>
</div>

