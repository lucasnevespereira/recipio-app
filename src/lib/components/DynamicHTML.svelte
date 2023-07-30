<script>
    export let htmlContent;
    const replaceWithTailwindClasses = (html) => {
        html = html.replace(/<ul>/g, '<ul class="list-disc list-inside">');
        html = html.replace(/<ol>/g, '<ul class="list-decimal list-inside">');
        html = html.replace(/<h1>/g, '<h1 class="h1">');
        html = html.replace(/<h2>/g, '<h2 class="h2">');
        html = html.replace(/<h3>/g, '<h3 class="h3">');

        return html;
    }

</script>

<div class="dynamic-html">
    {@html replaceWithTailwindClasses(htmlContent)}
</div>
