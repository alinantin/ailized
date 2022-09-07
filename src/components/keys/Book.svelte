<script lang="ts">
    import Page from "../page/Page.svelte";
</script>

<Page
    url={localStorage.bookUrl ||
        "https://raw.githubusercontent.com/alinantin/ailized/main/book.md"}
    id="Book"
/>
