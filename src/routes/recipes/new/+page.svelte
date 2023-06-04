<script lang="ts">
    import {FileDropzone, InputChip} from '@skeletonlabs/skeleton';

    let files: FileList;
    let ingredientsList: string[] = [];
    let previewFile

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
                <span class="preview">
                    {files[0].name}
                </span>
                {/if}
            </label>
        </div>
        <div class="right">
            <label class="label mb-3">
                <span>Ingredients</span>
                <InputChip bind:value={ingredientsList} name="ingredients" placeholder="Enter recipe ingredients..."/>
            </label>
        </div>
    </div>
</form>