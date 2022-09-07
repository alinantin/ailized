<script lang="ts">
  import Icon from "./icon/Icon.svelte";
  export let name: string;
  export let icon = name;
</script>

<span class="head"><Icon name={icon} /><slot>{name}</slot></span>
