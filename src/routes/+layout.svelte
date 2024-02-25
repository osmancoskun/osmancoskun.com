<script>
  import "./styles.css";
  import Panel from "$lib/layouts/panel.svelte";
  import Dash from "$lib/layouts/dash.svelte";
  import { activiesOverview } from "$lib/store";
</script>

<Panel />
<div
  class="flex-grow transition-all z-20 {$activiesOverview
    ? 'mx-40 my-10 mb-0 rounded-3xl'
    : ''}"
>
  <slot />
</div>
<Dash></Dash>

<style>
  div {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(/src/lib/images/wallpaper/landscape2.jpg);
  }
</style>
