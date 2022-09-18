<script lang="ts">
  import { messages } from "../../../../store";

  import FirstLastChild from "../../../FirstLastChild.svelte";

  export let text: string;

  let knownParAsRead = localStorage.getItem("known_p_read") === "1";

  const handleClick = (
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) => {
    const el = event.currentTarget;
    const elId = el.querySelector(".id");
    if (!elId) return;
    if (!knownParAsRead && !elId.classList.contains("read")) {
      messages.set([
        "You marked the paragraph as read, indicated by the bullet in front not being visible",
        "i",
      ]);
      knownParAsRead = true;
      localStorage.setItem("known_p_read", "1");
    }
    localStorage.setItem("read_" + elId.id, "1");
    elId.classList.add("read");
  };
</script>

{#each text.split(/\r?\n/) as text1, i}
  {#if text1.trim()}
    <div class="key" on:click={handleClick}>
      {#if !i}<FirstLastChild id="pitch" is="first" />{/if}
      <span class="text">
        <slot text={text1} />
      </span>
      {#if text.length === i + 1}<FirstLastChild id="pitch" is="last" />{/if}
    </div>
  {/if}
{/each}
