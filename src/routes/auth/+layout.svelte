<script>
import {Toast} from "@skeletonlabs/skeleton";
</script>

<div class="container p-10 mx-auto">
    <div class="container h-full mx-auto gap-8 flex flex-col">
            <slot></slot>
    </div>
    <Toast/>
</div>