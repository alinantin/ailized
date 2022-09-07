<script lang="ts">
  import { d3, messages, default3DWorld, hash } from "../../../store";
  import { iIsOdd, idFromUrlVar } from "../../../fun";
  import Icon from "../../icon/Icon.svelte";
  const hashLive = hash.live;

  const reg3D = (str: string) => str.split(/(\[▶\].*?-->)/g),
    reg3DHref = (str: string) => str.match(/\((.*)\)/)[1],
    reg3DObj = (str: string) => str.match(/\<!--(.*)-->/)[1];

  const handle3DClick = (
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLElement;
    }
  ) => {
    const el = event.currentTarget;
    changeWorld(el);
  };

  const changeWorld = (el: HTMLElement) => {
    let currentWorld = {};
    try {
      currentWorld = JSON.parse(el.dataset.d3);
    } catch (error) {
      messages.set(["JSON error", "e"]);
      el.classList.add("jsonErr");
    }

    if (el.classList.contains("on")) {
      el.classList.remove("on");

      $d3?.update($default3DWorld);
    } else {
      const prevOn = document.querySelector("[data-d3].on");
      if (prevOn) {
        prevOn.classList.remove("on");
      }

      el.classList.add("on");
      $d3?.update(currentWorld);
    }
  };

  export let text: string, id: "About" | "Book";
  const idLC = id.toLowerCase();

  let anchor: HTMLAnchorElement;
  $: if (anchor) {
    const parId = anchor.parentElement
        .querySelector(".id")
        .id.replace(idLC, ""),
      d3Id = anchor.id.replace("d", "");

    if (parId === $hashLive.get(idLC) && d3Id === $hashLive.get("3d")) {
      changeWorld(anchor);
    }
  }
</script>

{#each reg3D(text) as text1, i}
  {#if iIsOdd(i)}
    <a
      title="3D"
      bind:this={anchor}
      id={"d" + idFromUrlVar(text1, "3d")}
      href={reg3DHref(text1)}
      on:click|preventDefault={handle3DClick}
      data-d3={reg3DObj(text1)}><Icon name="D3" /></a
    >
  {:else}<slot text={text1} />
  {/if}
{/each}
