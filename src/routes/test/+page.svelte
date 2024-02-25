<script>
  import { Avatar, GoPrev } from "$lib/images/gnome/index.js";
  let show = true;
  const toggle = () => {
    show = !show;
  };
</script>

<main
  class="backdrop-blur-sm bg-[#232323] flex flex-col items-center justify-center"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="w-96 flex flex-col">
    {#if show}
      <div
        on:click={toggle}
        class="{show ? 'flex ' : 'hidden'} translate-up
            items-center gap-5 p-3 bg-lockscreen-account-bg rounded-md cursor-pointer"
      >
        <img src={Avatar} alt="" class="h-20 border pt-1 rounded" />
        <span class="text-white text-xl"> Your Name </span>
      </div>
      <span class="text-white mt-3 text-lg">Not Listed?</span>
    {:else}
      <div class="flex flex-col max-w-96">
        <img src={Avatar} alt="" class="h-20 pt-1 rounded mb-2" />
        <span class="text-white text-center mb-4 text-2xl"> Arch Linux </span>
        <div class="flex items-center gap-2">
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <img
            on:click={toggle}
            src={GoPrev}
            alt=""
            class="rounded-full p-3 bg-[#1B1B1B cursor-pointer"
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            class="bg-[#1B1B1B] w-full rounded-xl border border-gray-700 font-3xl text-white p-3 focus:outline-none focus:shadow-transparent placeholder-white"
          />
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    height: calc(100vh - var(--panel-height));
  }
</style>
