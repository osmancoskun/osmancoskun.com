<script>
    import {
        VolIcon,
        WirNetIcon,
        SysShutIcon,
        GoNext,
        SysLckScr,
        EmbSys,
        ScrShot,
    } from "$lib/images/gnome";
    let show = false;
    const toggleMenu = () => (show = !show);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="flex py-1.5 px-2.5 cursor-pointer hover:bg-[#242323] hover:rounded-2xl"
    on:click={toggleMenu}
>
    <img class="my-auto mx-0.5" src={WirNetIcon} alt="" />
    <img class="my-auto mx-0.5" src={VolIcon} alt="" />
    <img class="my-auto mx-0.5" src={SysShutIcon} alt="" />
    <div
        class="absolute z-10 top-9 right-1.5 rounded-3xl p-5 w-[400px] bg-panel-el-color {show
            ? 'block'
            : 'hidden'}"
    >
        <div class="flex justify-between items-center gap-2.5">
            <div class="flex justify-between items-center gap-2.5">
                <div
                    class="h-10 w-10 flex items-center justify-center rounded-full bg-panel-el-bg hover:bg-panel-el-bg-hover"
                >
                    <img src={ScrShot} alt="" />
                </div>
                <div
                    class="h-10 w-10 flex items-center justify-center rounded-full bg-panel-el-bg hover:bg-panel-el-bg-hover"
                >
                    <img src={EmbSys} alt="" />
                </div>
            </div>
            <div class="flex justify-between items-center gap-2.5">
                <div
                    class="h-10 w-10 flex items-center justify-center rounded-full bg-panel-el-bg hover:bg-panel-el-bg-hover"
                >
                    <img src={SysLckScr} alt="" />
                </div>
                <div
                    class="h-10 w-10 flex items-center justify-center rounded-full bg-panel-el-bg hover:bg-panel-el-bg-hover"
                >
                    <img src={SysShutIcon} alt="" />
                </div>
            </div>
        </div>
        <div class="flex items-center mt-5 gap-5">
            <img class="h-8 w-8" src={VolIcon} alt="" />
            <input
                type="range"
                class="w-full h-1 bg-panel-el-bg-color hover:bg-transparent"
                on:click={(e) => {
                    e.stopPropagation();
                }}
                on:blur={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />
            <img class="h-5 w-5" src={GoNext} alt="" />
        </div>
        <div class=" flex items-center font-medium gap-4 mt-2.5">
            <div
                class="flex items-center
            font-medium gap-4 mt-2.5 h-12 w-full
            rounded-3xl pl-5 bg-panel-el-bg-color
            hover:bg-panel-el-bg-hover"
            >
                <div class="w-full flex items-center gap-3.5">
                    <img src={WirNetIcon} alt="" />
                    <span>Wired</span>
                </div>
                <div
                    class="bg-panel-el-bg-color-bright
                    flex items-center justify-center
                    rounded-tr-3xl rounded-br-3xl
                    w-12 h-full border-l-panel-el-color
                    hover:bg-panel-el-bg-color-bright-hover"
                >
                    <img class="mr-3.5 ml-2.5" src={GoNext} alt="" />
                </div>
            </div>
            <div
                class="flex items-center
                font-medium gap-4 mt-2.5 h-12 w-full
                rounded-3xl pl-5 bg-panel-el-bg-color
                hover:bg-panel-el-bg-hover"
            >
                <div class="w-full flex items-center gap-3.5">
                    <img src={WirNetIcon} alt="" />
                    <span>Wired</span>
                </div>
                <div
                    class="
                    bg-panel-el-bg-color-bright
                    flex items-center justify-center
                    rounded-tr-3xl rounded-br-3xl
                    w-12 h-full border-l-panel-el-color
                    hover:bg-panel-el-bg-color-bright-hover"
                >
                    <img class="mr-3.5 ml-2.5" src={GoNext} alt="" />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    span {
        @apply m-0 p-0;
    }
    img {
        @apply h-4 w-4;
    }
</style>
