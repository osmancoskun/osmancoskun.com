<script>
  import Clock from "$lib/components/clock.svelte";
  import SystemActions from "$lib/components/system_actions.svelte";
  import { activiesOverview } from "$lib/store";
</script>

<div
  class="flex items-center justify-between w-full text-white h-[var(--panel-height)] bg-panel-color px-3.5"
>
  <button
    on:click={() => {
      $activiesOverview = !$activiesOverview;
    }}
    class="flex py-0.5 px-2.5 text-md cursor-pointer hover:bg-[#242323] hover:rounded-2xl"
  >
    Activities
  </button>
  <span>
    <Clock />
  </span>
  <SystemActions />
</div>
