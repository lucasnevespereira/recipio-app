<script lang="ts">
    import {FileDropzone, InputChip} from '@skeletonlabs/skeleton';

    let recipeImages: FileList;
    let ingredientsList: string[] = [];
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
                <FileDropzone name="recipeImages"/>
            </label>
        </div>
        <div class="right">
            <label class="label mb-3">
                <span>Ingredients</span>
                <InputChip bind:value={ingredientsList} name="ingredients" placeholder="Enter recipe ingredients..." />
            </label>
        </div>
    </div>
</form>