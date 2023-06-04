<script lang="ts">
    import Editor from '@tinymce/tinymce-svelte';
    import {PUBLIC_TINY_MCE_API_KEY} from '$env/static/public'

    export let editorValue = '';
    let conf = {
        "height": 500,
        "plugins": [
            "advlist", "autolink",
            "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks",
            "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
        ],
        "toolbar": "undo redo | casechange blocks | bold italic | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | code table help"
    }
</script>

<main>
    <Editor
            apiKey={PUBLIC_TINY_MCE_API_KEY}
            {conf}
            bind:value={editorValue}
    />
</main>