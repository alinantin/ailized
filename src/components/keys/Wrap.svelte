<script lang="ts">
  import FirstLastChild from "../FirstLastChild.svelte";
  import Head from "../Head.svelte";

  const values: ["off", "on"] = ["off", "on"];

  let group = values.find((it) => it === localStorage.keys_wrap) || values[0];

  $: document.documentElement.dataset.keys_wrap = localStorage.keys_wrap =
    group;
</script>

<div class="key">
  <Head name="Wrap" />
  {#each values as value}
    <label><input type="radio" bind:group {value} /><span />{value}</label>
  {/each}
  <FirstLastChild id="keys" is="last" />
</div>
