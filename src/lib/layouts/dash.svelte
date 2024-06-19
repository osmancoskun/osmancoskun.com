<script>
  import { activiesOverview } from "$lib/store";
  import { ViewGridIcon, FileManager } from "$g_images";
</script>

<div
  class="{$activiesOverview ? 'z-1' : 'z-0'} 
         px-5 h-32 fixed bottom-10 transition-all bg-slate-700 rounded-3xl left-1/2 -translate-x-1/2 w-auto"
>
  <div class="flex items-center h-full">
    <button>
      <img src={FileManager} class="h-20 w-20" alt="" />
    </button>
    <div class="h-24 border-2 ml-5 mr-2"></div>
    <button on:click={() => ($activiesOverview = !$activiesOverview)}>
      <img src={ViewGridIcon} class="h-20 w-20" alt="" />
    </button>
  </div>
</div>
