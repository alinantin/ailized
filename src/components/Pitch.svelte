<script lang="ts">
    import { d3, errors, pitch } from "../store";
    import type D3 from "../3d";
    import Icon from "./icon/Icon.svelte";
    import { onMount } from "svelte";
    import FirstLastChild from "./FirstLastChild.svelte";

    let url =
        localStorage.url ||
        "https://raw.githubusercontent.com/alinantin/ailized/main/README.md";

    document.body.classList.add("loading");

    onMount(async () => {
        fetch(url, { cache: "reload" })
            .then((response) => {
                if (!response.ok) throw Error("" + response.status);
                return response.text();
            })
            .then((text) => (content = text))
            .catch((error) => ($errors = ["Pitch " + error, ...$errors]))
            .finally(() => document.body.classList.remove("loading"));
    });

    // const result = str.split(/\r?\n/);
    /* onMount(async () => {
        fetch(url + "pitch.json", { cache: "reload" })
            .then((response) => {
                if (!response.ok) throw Error("" + response.status);
                return response.json();
            })
            .then((json) => (content = json))
            .catch((error) => ($errors = ["Pitch " + error, ...$errors]))
            .finally(() => document.body.classList.remove("loading"));
    }); */

    let content = "";

    /* let content: {
        text: string;
        world?: Parameters<D3["update"]>[1];
    }[] = []; */

    /* let d3A: D3, wordA: Parameters<D3["update"]>[1];

    $: d3A?.update(url, wordA);

    $: if (content?.length) {
        pitch.subscribe((pitch) => (wordA = content?.[pitch]?.world || {}));
        d3.subscribe((d3) => (d3A = d3));
    } */

    let pieces: string[];

    let defaultWorld: Parameters<D3["update"]>[1];

    const setDefaultWorld = (text: string) => {
        if (defaultWorld) return false;

        defaultWorld = JSON.parse(reg3DObj(text));
        d3Up?.update("./media/", defaultWorld);

        return true;
    };

    let d3Up: D3; //,
    // theWorld: Parameters<D3["update"]>[1] = {
    //     bot: {
    //         intoViewOffset: 10,
    //     },
    //     mannequin: {},
    //     // cone: {},
    // };
    // $: d3Up?.update("./media/", theWorld);
    d3.subscribe((d3) => (d3Up = d3));

    const regFound = (i: number) => i % 2 === 1;

    const reg3D = (str: string) => str.split(/(<!--.*?-->)/g),
        reg3DObj = (str: string) => str.match(/\<!--3d(.*)-->/)[1] || "";

    const regLink = (str: string) => str.split(/(\[.*?\]\(.*?\))/g),
        regLinkTitle = (str: string) => str.match(/\[(.*)\]/)[1] || "",
        regLinkHref = (str: string) => str.match(/\((.*)\)/)[1] || "";

    const regBoldItalic = (str: string) => str.split(/(\*\*\*.*?\*\*\*)/g),
        regBoldItalicText = (str: string) => str.match(/\*\*\*(.*)\*\*\*/)[1];

    const handle3DClick = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        const currentTarget = event.currentTarget;
        let currentWorld = {};
        try {
            currentWorld = JSON.parse(currentTarget.dataset.d3);
        } catch (error) {
            console.log(currentTarget.dataset.d3);
            $errors = ["JSON error", ...$errors];
            currentTarget.classList.add("jsonErr");
        }

        if (currentTarget.classList.contains("on")) {
            currentTarget.classList.remove("on");

            d3Up?.update("./media/", defaultWorld || {});
        } else {
            const prevOn = document.querySelector("[data-d3].on");
            if (prevOn) {
                prevOn.classList.remove("on");
            }

            currentTarget.classList.add("on");
            d3Up?.update("./media/", currentWorld);
        }
    };
</script>

<div class="brake" />
<div id="pitch" class="key"><span><Icon name="Presentation" />Pitch</span></div>
<div class="brake" />

<!-- new line -->
{#each content.split(/\r?\n/) as text, i}
    <!-- trim -->
    {#if text.trim()}
        <div class="key" data-pitch={i} on:click={() => ($pitch = i)}>
            <!-- the first -->
            {#if !i}<FirstLastChild id="pitch" is="first" />{/if}
            <!-- bookmarked -->
            {#if $pitch === i}
                <span class="bookmark"><Icon name="Bookmark" /></span>
            {/if}
            <span class="text">
                {#each regLink(text) as text1, i}
                    {#if regFound(i)}
                        <a href={regLinkHref(text1)}
                            >{regLinkTitle(text1) || regLinkHref(text1)}</a
                        >
                    {:else}
                        {#each regBoldItalic(text1) as text2, i}
                            {#if regFound(i)}
                                <b><i>{regBoldItalicText(text2)}</i></b>
                            {:else}
                                {#each reg3D(text2) as text3, i}
                                    {#if regFound(i)}{#if !setDefaultWorld(text3)}<span
                                                on:click={handle3DClick}
                                                data-d3={reg3DObj(text3)}
                                                ><Icon name="D3" /></span
                                            >{/if}{:else}{text3}
                                    {/if}
                                {/each}
                            {/if}
                        {/each}
                    {/if}
                {/each}
            </span>
            <!-- the last -->
            {#if content.length === i + 1}<FirstLastChild
                    id="pitch"
                    is="last"
                />{/if}
        </div>
    {/if}
{/each}

<!-- {#each content as { text, world }, i}
    <div
        class="key"
        data-pitch={i}
        on:click={() => ($pitch === i ? (wordA = world) : ($pitch = i))}
    >
        {#if !i}<FirstLastChild id="pitch" is="first" />{/if}
        {#if $pitch === i}<span class="bookmark"><Icon name="Bookmark" /></span
            >{/if}<span class="text"
            >{#each text.split(/((?:\/[^/]+\/)?https?:\/\/\S+)(?<!,|\.)/g) as item, i}
                {#if i % 2 === 1}{#if (pieces = item.split(/\/([^\/]+)\/(https?:\/\/\S+)/))}<a
                            class="link"
                            href={pieces[2] || pieces[0]}
                            >{pieces[1] || pieces[2] || pieces[0]}</a
                        >{/if}{:else}<span>{item}</span>{/if}{/each}</span
        >{#if content.length === i + 1}<FirstLastChild
                id="pitch"
                is="last"
            />{/if}
    </div>
{/each} -->
<style lang="scss">
    [data-pitch] {
        text-indent: 1rem;
        line-height: 1.2;

        .bookmark {
            position: absolute;
            left: 0;
            top: 0.15rem;
        }
    }
</style>
