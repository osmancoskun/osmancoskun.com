<script>
    import Clock from "$lib/components/clock.svelte";
    import {
        VolIcon,
        WirNetIcon,
        SysShutIcon,
        ViewGridIcon,
        GoNext,
    } from "$lib/images/gnome";
    let show = false;
    const toggleMenu = () => (show = !show);
</script>

<div class="panel">
    <span class="activity">Activities</span>
    <span>
        <Clock />
    </span>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="panel-settings" on:click={toggleMenu}>
        <img class="sys-icon" src={WirNetIcon} alt="" />
        <img class="sys-icon" src={VolIcon} alt="" />
        <img class="sys-icon" src={SysShutIcon} alt="" />
        <div class="panel-settings-content" class:show>
            <div class="sys-row">
                <div class="sys-buttons">
                    <div class="sys-button">
                        <img class="sys-img" src={ViewGridIcon} alt="" />
                    </div>
                    <div class="sys-button">
                        <img class="sys-img" src={ViewGridIcon} alt="" />
                    </div>
                </div>
                <div class="sys-buttons">
                    <div class="sys-button">
                        <img class="sys-img" src={ViewGridIcon} alt="" />
                    </div>
                    <div class="sys-button">
                        <img class="sys-img" src={ViewGridIcon} alt="" />
                    </div>
                </div>
            </div>
            <div class="sys-brightness">
                <img class="sys-img" src={VolIcon} alt="" />
                <input type="range" class="input-brightness" />
                <img class="sys-img" src={GoNext} alt="" />
            </div>
            <div class="sys-settings">
                <div class="sys-setting">
                    <div class="sys-setting-left">
                        <img src={WirNetIcon} alt="" />
                        <span>Wired</span>
                    </div>
                    <div class="sys-setting-right">
                        <img
                            class="sys-img sys-setting-img"
                            src={GoNext}
                            alt=""
                        />
                    </div>
                </div>
                <div class="sys-setting">
                    <div class="sys-setting-left">
                        <img src={WirNetIcon} alt="" />
                        <span>Wired</span>
                    </div>
                    <div class="sys-setting-right">
                        <img
                            class="sys-img sys-setting-img"
                            src={GoNext}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="sys-settings">
                <div class="sys-setting">
                    <div class="sys-setting-left">
                        <img src={WirNetIcon} alt="" />
                        <span>Wired</span>
                    </div>
                    <div class="sys-setting-right">
                        <img
                            class="sys-img sys-setting-img"
                            src={GoNext}
                            alt=""
                        />
                    </div>
                </div>
                <div class="sys-setting">
                    <div class="sys-setting-left">
                        <img src={WirNetIcon} alt="" />
                        <span>Wired</span>
                    </div>
                    <div class="sys-setting-right">
                        <img
                            class="sys-img sys-setting-img"
                            src={GoNext}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="sys-settings">
                <div class="sys-setting">
                    <div class="sys-setting-left">
                        <img src={WirNetIcon} alt="" />
                        <span>Wired</span>
                    </div>
                    <div class="sys-setting-right">
                        <img
                            class="sys-img sys-setting-img"
                            src={GoNext}
                            alt=""
                        />
                    </div>
                </div>
                <div class="sys-setting">
                    <div class="sys-setting-left">
                        <img src={WirNetIcon} alt="" />
                        <span>Wired</span>
                    </div>
                    <div class="sys-setting-right">
                        <img
                            class="sys-img sys-setting-img"
                            src={GoNext}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .panel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--panel-height);
        width: 100%;
        background: var(--panel-color);
        color: white;
    }
    .activity {
        margin-left: 15px;
    }

    span {
        margin: 0;
        padding: 0;
    }
    img {
        height: 15px;
        width: 15px;
    }
    .sys-img {
        height: 20px;
        width: 20px;
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
        padding: 5px 18px;
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
        height: 300px;
        background-color: darkgray;
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
    .sys-buttons {
        gap: 10px;
    }
    .sys-button {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: lightgray;
        border-radius: 50%;
    }
    .input-brightness {
        width: 100%;
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
        background-color: blue;
        padding-left: 25px;
    }
    .sys-setting-left {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .sys-setting-right {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 100%;
        border-left: 1px solid lightblue;
    }
</style>
