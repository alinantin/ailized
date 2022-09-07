<script lang="ts">
  import Page from "../page/Page.svelte";
</script>

<Page
  url={localStorage.aboutUrl ||
    "https://raw.githubusercontent.com/alinantin/ailized/main/README.md"}
  id="About"
/>
