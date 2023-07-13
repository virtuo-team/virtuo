<script lang="ts">
    export let error: Error | undefined = undefined;
    export let actionMessage: string = "";
</script>

{#if error !== undefined}
    <div class="clear-both w-[50rem] mt-4">
        <p class="text-xl">There was an error (see below). {actionMessage}</p>
        <p class="text-red-600">{error.message}</p>
        <p>If this error is coming up repeatedly, please email support, providing a full screenshot of the webpage.</p>
    </div>
{/if}