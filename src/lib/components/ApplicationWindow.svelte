<script>
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
  <div class="header" on:mousedown={onMouseDown}>{headerLabel}</div>
  <div class="content">{contentLabel}</div>
</div>

<style>
  .window {
    position: absolute;
    border: 1px solid #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #fff;
    overflow: hidden;
  }
  .header {
    background: #ccc;
    padding: 5px;
    cursor: move;
  }
  .content {
    padding: 10px;
  }
</style>
