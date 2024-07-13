<script>
  import { activiesOverview, activeApps } from "$lib/store";
  import { ViewGridIcon, FileManager as FMIcon } from "$g_images";
  import { FileManager, System, ToDo, Web } from "$g_apps";
  const apps = [
    {
      icon: FMIcon,
      binding: "file_manager",
      app: FileManager,
    },
    {
      icon: FMIcon,
      binding: "todo_app",
      app: ToDo,
    },
    {
      icon: FMIcon,
      binding: "web_app",
      app: Web,
    },
    {
      icon: FMIcon,
      binding: "sys_app",
      app: System,
    },
  ];
  const toggleActivity = () => ($activiesOverview = !$activiesOverview);
</script>

<div
  class="{$activiesOverview ? ' z-1 ' : ' z-0 '} 
         px-5 h-32 fixed bottom-10 transition-all bg-slate-700 rounded-3xl left-1/2 -translate-x-1/2 w-auto"
>
  <div class="flex items-center h-full">
    {#each apps as _app}
      <button
        on:click={() => {
          $activeApps[_app.binding] = !$activeApps[_app.binding];
          toggleActivity();
        }}
      >
        <img src={_app.icon} alt="" class="h-20 w-20" />
      </button>
    {/each}
    <div class="h-24 border-2 ml-5 mr-2"></div>
    <button on:click={toggleActivity}>
      <img src={ViewGridIcon} class="h-20 w-20" alt="" />
    </button>
  </div>
</div>
