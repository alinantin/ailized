<script lang="ts">
  import { iIsOdd } from "../../../../fun";

  const regBoldItalic = (str: string) => str.split(/(\*\*\*.*?\*\*\*)/g),
    regBoldItalicText = (str: string) => str.match(/\*\*\*(.*)\*\*\*/)[1];

  export let text: string;
</script>

{#each regBoldItalic(text) as text1, i}
  {#if iIsOdd(i)}
    <b><i>{regBoldItalicText(text1)}</i></b>
  {:else}<slot text={text1} />
  {/if}
{/each}
