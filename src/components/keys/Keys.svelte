<script lang="ts">
  import Head from "../Head.svelte";

  import Direction from "./Direction.svelte";
  import Wrap from "./Wrap.svelte";

  const id = "Keys";

  let view: boolean = JSON.parse(localStorage.getItem(id + "_view") || "true");

  $: localStorage.setItem(id + "_view", "" + view);
</script>

<div class="key">
  <Head name={id} icon="KeyCap"
    ><label
      ><input type="checkbox" bind:checked={view} /><span /><span>{id}</span
      ></label
    ></Head
  >
</div>
{#if view}
  <Direction />
  <Wrap />
{/if}
