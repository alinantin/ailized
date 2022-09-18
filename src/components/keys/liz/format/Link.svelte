<script lang="ts">
  import { iIsOdd } from "../../../../fun";

  const regSplit = (str: string) => str.split(/(\[.*?\]\(.*?\))/g),
    regMatchTitle = (str: string) => str.match(/\[(.*)\]/)[1],
    regMatchHref = (str: string) => str.match(/\((.*)\)/)[1];

  export let text: string;
</script>

{#each regSplit(text) as text1, i}
  {#if iIsOdd(i)}
    <a href={regMatchHref(text1)}
      >{regMatchTitle(text1) || regMatchHref(text1)}</a
    >
  {:else}<slot text={text1} />
  {/if}
{/each}
