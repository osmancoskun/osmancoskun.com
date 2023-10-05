<script>
    import { onMount } from "svelte";

    let time = new Date();
    $: hour = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: false,
    });
    $: minute = time.getMinutes();
    $: month = time.toLocaleString("default", { month: "short" });
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
</script>

<div class="time">
    <span>{month}</span>
    <span>{clock}</span>
</div>

<style>
    .time {
        cursor: pointer;
    }
</style>
