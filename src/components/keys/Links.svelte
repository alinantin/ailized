<script lang="ts">
    import Head from "../Head.svelte";

    import Icon from "../icon/Icon.svelte";

    const links = [
        {
            icon: "People",
            text: "Discussion",
            link: "https://github.com/alinantin/ailized/discussions",
        },
        {
            icon: "Support",
            text: "Support",
            link: "https://github.com/alinantin/ailized/issues",
        },
        // { icon: "Youtube", text: "YouTube", link: "http://" },
        // { icon: "Twitter", text: "Twitter", link: "http://" },
    ];
</script>

<div class="key">
    <Head name="Links" icon="Link" />
    {#each links as { icon, text, link }}<span
            ><Icon name={icon} /><a class="link" href={link}>{text}</a></span
        >{/each}
</div>
