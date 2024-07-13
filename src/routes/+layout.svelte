<script>
  import "./styles.css";
  import Panel from "$lib/layouts/panel.svelte";
  import Dash from "$lib/layouts/dash.svelte";
  import { activiesOverview } from "$lib/store";
</script>

<main class="h-screen w-screen">
  <Panel />
  <div
    class="flex-grow transition-all {$activiesOverview
      ? ' mx-40 my-10 mb-52 rounded-3xl w-[calc(100vw-20rem)] h-[calc(100vh-18rem)]'
      : ' w-screen h-[calc(100vh-var(--panel-height))] '}"
  >
    <slot />
  </div>
  <Dash />
</main>

<style>
  div {
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 10;
    background-image: url(/src/lib/images/wallpaper/landscape3.jpg);
  }
</style>
