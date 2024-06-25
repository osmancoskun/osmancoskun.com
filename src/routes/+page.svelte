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
</script>

{#each apps as _app}
  {#if $activeApps[_app["binding"]]}
    <svelte:component this={_app.app} />
  {/if}
{/each}
