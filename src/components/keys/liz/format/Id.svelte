<script lang="ts">
  import { iIsOdd, idFromUrlVar } from "../../../../fun";
  import { hash } from "../../../../store";

  const regSplit = (str: string) => str.split(/^(\[#\]\(.*?\))/g),
    // regMatchTitle = (str: string) => str.match(/\[(.*)\]/)[1],
    regMatchHref = (str: string) => str.match(/\((.*)\)/)[1];

  export let text: string;

  export let id: string;

  const idLC = id.toLowerCase();
</script>

{#each regSplit(text) as text1, i}
  {#if iIsOdd(i)}
    <a
      class:read={localStorage.getItem(
        "read_" + idLC + idFromUrlVar(text1, idLC)
      ) === "1"}
      id={idLC + idFromUrlVar(text1, idLC)}
      class="id"
      href={regMatchHref(text1)}
      on:click|preventDefault|stopPropagation={(event) =>
        hash.set([idLC, event.currentTarget.id.replace(idLC, "")])}>&bull;</a
    >
  {:else}<slot text={text1} />
  {/if}
{/each}
