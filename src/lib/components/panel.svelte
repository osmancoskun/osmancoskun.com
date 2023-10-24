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
<div class="panel-settings" on:click={toggleMenu}>
    <img class="sys-icon" src={WirNetIcon} alt="" />
    <img class="sys-icon" src={VolIcon} alt="" />
    <img class="sys-icon" src={SysShutIcon} alt="" />
    <div class="panel-settings-content" class:show>
        <div class="sys-row">
            <div class="sys-buttons">
                <div class="sys-button">
                    <img class="sys-img" src={ScrShot} alt="" />
                </div>
                <div class="sys-button">
                    <img class="sys-img" src={EmbSys} alt="" />
                </div>
            </div>
            <div class="sys-buttons">
                <div class="sys-button">
                    <img class="sys-img" src={SysLckScr} alt="" />
                </div>
                <div class="sys-button">
                    <img class="sys-img" src={SysShutIcon} alt="" />
                </div>
            </div>
        </div>
        <div class="sys-brightness">
            <img class="sys-img" src={VolIcon} alt="" />
            <input
                type="range"
                class="input-brightness"
                on:click={(e) => {
                    e.stopPropagation();
                }}
                on:blur={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />
            <img class="sys-img" src={GoNext} alt="" />
        </div>
        <div class="sys-settings">
            <div class="sys-setting">
                <div class="sys-setting-left">
                    <img src={WirNetIcon} alt="" />
                    <span>Wired</span>
                </div>
                <div class="sys-setting-right">
                    <img class="sys-img sys-setting-img" src={GoNext} alt="" />
                </div>
            </div>
            <div class="sys-setting">
                <div class="sys-setting-left">
                    <img src={WirNetIcon} alt="" />
                    <span>Wired</span>
                </div>
                <div class="sys-setting-right">
                    <img class="sys-img sys-setting-img" src={GoNext} alt="" />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    span {
        margin: 0;
        padding: 0;
    }
    img {
        height: 15px;
        width: 15px;
    }
    .sys-img {
        height: 16px;
        width: 16px;
    }
    .sys-setting-img {
        margin-right: 15px;
        margin-left: 10px;
    }

    .sys-icon {
        margin: auto 2px;
    }
    .panel-settings {
        position: relative;
        display: inline-block;
        padding: 5px 10px;
        cursor: pointer;
    }

    .panel-settings:hover {
        background-color: rgb(36, 35, 35);
        border-radius: 20px;
    }
    .panel-settings-content {
        display: none;
        position: absolute;
        width: 400px;
        /*height: 300px;*/
        background-color: var(--panel-el-color);
        z-index: 1;
        top: 35px;
        right: 5px;
        border-radius: 30px;
        padding: 20px;
    }
    .show {
        display: block;
    }
    .sys-row,
    .sys-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .sys-brightness {
        display: flex;
        align-items: center;
        margin-top: 20px;
        gap: 20px;
    }
    .sys-brightness .sys-img {
        height: 20px;
        width: 20px;
    }
    .sys-buttons {
        gap: 10px;
    }
    .sys-button {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--panel-el-bg-color);
        border-radius: 50%;
    }
    .sys-button:hover {
        background-color: var(--panel-el-bg-color-hover);
    }
    .input-brightness {
        width: 100%;
        height: 4px;
        background-color: var(--panel-el-bg-color);
    }
    .input-brightness:hover {
        background-color: unset;
    }
    .sys-settings,
    .sys-setting {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: medium;
    }
    .sys-setting {
        height: 50px;
        width: 100%;
        border-radius: 25px;
        background-color: var(--panel-el-bg-color);
        padding-left: 20px;
    }
    .sys-setting:hover {
        background-color: var(--panel-el-bg-color-hover);
    }
    .sys-setting-left {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .sys-setting-right {
        background-color: var(--panel-el-bg-color-bright);
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 100%;
        border-left: 1px solid var(--panel-el-color);
    }
    .sys-setting-right:hover {
        background-color: var(--panel-el-bg-color-bright-hover);
    }
</style>
