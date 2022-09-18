<script lang="ts">
  import { onMount } from "svelte";
  import { messages, hash } from "../../../store";
  import Head from "../../Head.svelte";
  import BoldAndItalic from "./format/BoldAndItalic.svelte";
  import D3 from "./format/D3.svelte";
  import Id from "./format/Id.svelte";
  import Link from "./format/Link.svelte";
  import Paragraph from "./format/Paragraph.svelte";

  const fetching = () => {
    document.body.classList.add("loading");
    return fetch(url, { cache: "reload" })
      .then((response) => {
        if (!response.ok) throw Error("" + response.status);
        return response.text();
      })
      .then((text1) => (text = text1))
      .catch((error) => messages.set(["Liz " + error, "e"]))
      .finally(() => document.body.classList.remove("loading"));
  };

  const id = "Liz";
  const idLC = "liz";

  const url =
    localStorage.url ||
    "https://raw.githubusercontent.com/alinantin/ailized/main/README.md";

  let view = true;

  // hash.live.subscribe((map) => (view = map.has(idLC)));

  let text = "";

  onMount(() => {
    if (!view) return;
    fetching().then(() => {
      hash.live.subscribe((map) => {
        const urlAbout = map.get(idLC);
        if (!urlAbout) return;

        const elId = idLC + urlAbout;

        setTimeout(() => {
          const el = document.getElementById(elId);
          if (!el) return;
          el.closest(".key").scrollIntoView();
        }, 250);
      });
    });
  });

  $: {
    localStorage.setItem(idLC + "_view", "" + view);
    if (view) {
      if (!text) fetching();
    }
  }
</script>

{#if view}
  <div class="brake" />
{/if}
<div class="key">
  <Head name={id}
    ><!-- <label
      ><input
        on:change={(event) => {
          if (event.currentTarget.checked) return hash.set([idLC]);
          hash.delete(idLC);
        }}
        type="checkbox"
        bind:checked={view}
      /><span /><span>{id}</span></label
    > -->{id}</Head
  >
</div>
{#if view}
  <div class="brake" />
  <Paragraph {text} let:text={text1}>
    <Id {id} text={text1} let:text={text2}>
      <BoldAndItalic text={text2} let:text={text3}>
        <D3 {id} text={text3} let:text={text4}>
          <Link text={text4} let:text={text5}>{text5}</Link>
        </D3>
      </BoldAndItalic>
    </Id>
  </Paragraph>
{/if}
