<script lang="ts">
  import Canvas from "./components/Canvas.svelte";
  import Errors from "./components/Messages.svelte";
  import Listen from "./components/keys/Listen.svelte";
  import Speak from "./components/keys/Speak.svelte";
  import DayNight from "./components/keys/DayNight.svelte";
  import ArrangeKey from "./components/keys/Keys.svelte";
  import Links from "./components/keys/Links.svelte";
  import Book from "./components/keys/Book.svelte";
  import About from "./components/keys/About.svelte";
</script>

<Canvas />
<Errors />
<!-- <Listen /> -->
<!-- <Speak /> -->
<DayNight />
<ArrangeKey />
<!-- <Links /> -->
<About />
<Book />
