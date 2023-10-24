<script>
    import { onMount } from "svelte";

    let time = new Date();
    $: hour = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: false,
    });
    $: minute = time.getMinutes();
    $: month =
        time.toLocaleString("default", { month: "short" }) +
        " " +
        time.getDate();
    $: clock = checkDigits(hour) + ":" + checkDigits(minute);
    onMount(() => {
        setInterval(() => {
            time = new Date();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });
    const checkDigits = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    let show = false;
    const toggleMenu = () => (show = !show);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="time" on:click={toggleMenu}>
    <span class="month">{month}</span>
    <span class="clock">{clock}</span>
    <div class="time-content" class:show>asdasd</div>
</div>

<style>
    .time {
        position: relative;
        display: inline-block;
        padding: 5px 10px;
        cursor: pointer;
    }
    .time-content {
        display: none;
        position: absolute;
        width: 740px;
        height: 300px;
        top: 35px;
        left: -350px;
        background-color: var(--panel-el-color);
        z-index: 1;
        border-radius: 30px;
        padding: 20px;
    }
    .clock {
        width: 80px;
    }
    .month {
        margin-right: 5px;
    }
    .show {
        display: block;
    }
</style>
