<script>
  import "./styles.css";
  import Panel from "$lib/layouts/panel.svelte";
  import Dash from "$lib/layouts/dash.svelte";
  import { activiesOverview } from "$lib/store";
</script>

<Panel />
<div
  class="flex-grow transition-all {$activiesOverview
    ? 'mx-40 my-10 mb-40 rounded-3xl'
    : ''}"
>
  <slot />
</div>
<Dash />

<style>
  div {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(/src/lib/images/wallpaper/landscape3.jpg);
    z-index: 2;
  }
</style>
