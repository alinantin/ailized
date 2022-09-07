<script lang="ts">
  import { messages } from "../store";
  import Icon from "./icon/Icon.svelte";
  const live = messages.live;
</script>

{#if $live.length}
  <div class="key error">
    <!-- <span
      ><span
        class="close"
        on:click={() => {
          $live = [];
        }}>×</span
      >&nbsp;<Icon name="Idea" />Info</span
    > -->
    {#each $live as message}
      <span
        ><span
          class="close"
          on:click={() => {
            messages.remove(message[0]);
          }}>×</span
        >&nbsp;<Icon
          name={message[1] === "e" ? "InfoTriangle" : "InfoCircle"}
        /><span class="text">{message[0]}</span></span
      >
    {/each}
  </div>
{/if}
