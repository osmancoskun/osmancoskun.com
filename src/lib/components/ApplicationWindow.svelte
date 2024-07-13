<script>
  import {
    WindowRestore,
    WindowMaximize,
    WindowMinimize,
    WindowClose,
  } from "$g_images";
  export let headerLabel = "";
  export let contentLabel = "";
  let posX = 100;
  let posY = 100;
  let width = 300;
  let height = 200;
  let dragging = false;
  let offsetX, offsetY;

  function onMouseMove(event) {
    if (dragging) {
      posX = event.clientX - offsetX;
      posY = event.clientY - offsetY;
    }
  }

  function onMouseUp() {
    dragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  function onMouseDown(event) {
    dragging = true;
    offsetX = event.clientX - posX;
    offsetY = event.clientY - posY;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }
</script>

<div
  class="window"
  style="top: {posY}px; left: {posX}px; width: {width}px; height: {height}px;"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="header flex items-center justify-between"
    on:mousedown={onMouseDown}
  >
    <div class="">
      <button>
        <img src={WindowClose} alt="" />
      </button>

      <button>
        <img src={WindowMinimize} alt="" />
      </button>
      <button>
        <img src={WindowRestore} alt="" />
      </button>
    </div>
    <span class="text-white">{headerLabel}</span>
    <div />
  </div>
  <div class="content">{contentLabel}</div>
</div>

<style>
  button {
    @apply rounded-full;
  }
  .window {
    position: absolute;
    border: 1px solid #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #fff;
    border-radius: 0.5em;
    overflow: hidden;
  }
  .header {
    background: var(--sidebar-bg-color);
    padding: 5px;
    cursor: move;
  }
  .content {
    padding: 10px;
  }
</style>
