<script lang="ts">
  import D3 from "../3d";
  import { d3, default3DWorld } from "../store";

  let canvas: HTMLCanvasElement;
  $: if (canvas) {
    $d3 = new D3(canvas);
    $d3.update($default3DWorld);
  }
</script>

<canvas bind:this={canvas} />
