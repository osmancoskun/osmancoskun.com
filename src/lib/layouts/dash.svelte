<script>
  import { activiesOverview } from "$lib/store";
</script>

<div
  class="{$activiesOverview ? 'z-1' : 'z-0'} 
         h-20 fixed bottom-5 mx-40 transition-all bg-slate-700 rounded-3xl w-[calc(100vw-20rem)]"
></div>
