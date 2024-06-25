import { writable } from "svelte/store";

export let activiesOverview = writable(false);
export let activeApps = writable({
  file_manager: false,
  todo_app: false,
  web_app: false,
  sys_app: false,
});
