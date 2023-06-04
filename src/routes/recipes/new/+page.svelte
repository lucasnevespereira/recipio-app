<script lang="ts">
    import {FileDropzone, InputChip} from '@skeletonlabs/skeleton';
    import RichEditor from "$lib/components/RichEditor/RichEditor.svelte"

    let files: FileList;
    let ingredientsList: string[] = [];
    let instructions: string

    function onFileUpload(e: Event): void {
        console.log('file data:', e);
    }
</script>

<form>
    <div class="grid grid-cols-2 gap-6">
        <div class="left">
            <label class="label mb-3">
                <span>Title</span>
                <input class="input" type="text" placeholder="Recipe Title"/>
            </label>

            <label class="label mb-3">
                <span>Description</span>
                <textarea class="textarea" rows="4" placeholder="Describe your recipe"></textarea>
            </label>

            <label class="label mb-3">
                <span>Image</span>
                <FileDropzone bind:files on:change={onFileUpload}>
                    <svelte:fragment slot="message">Upload a <b>recipe image</b></svelte:fragment>
                </FileDropzone>
                {#if files && files[0].name}
                    <div class="card p-4 w-100">
                        <span class="preview">
                            {files[0].name}
                        </span>
                    </div>
                {/if}
            </label>

            <div class="mt-10">
                <button type="button" class="btn variant-filled">Create Recipe</button>
            </div>
        </div>
        <div class="right">
            <label class="label mb-3">
                <span>Ingredients</span>
                <InputChip bind:value={ingredientsList} name="ingredients" placeholder="Enter recipe ingredients..."/>
            </label>
            <label class="label mb-3">
                <span>Instructions</span>
                <RichEditor bind:editorValue={instructions}/>
                <textarea name="instructions" class="hidden" bind:value={instructions}></textarea>
            </label>
        </div>
    </div>
</form>