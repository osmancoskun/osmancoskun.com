<script>
    import { onMount } from "svelte";

    onMount(() => {
        setInterval(() => {
            time = new Date();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });

    let time = new Date();
    let week_days = ["S", "M", "T", "W", "T", "F", "S"];
    let month_days = [];
    let show = false;
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
    $: get_dates();

    const checkDigits = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    const toggleMenu = () => (show = !show);

    const get_dates = () => {
        let first_day = new Date(time.setDate(1)).getDate();
        let last_day = new Date(
            time.getFullYear(),
            time.getMonth() + 1,
            0
        ).getDate();

        for (var i = 0; i < 42; i++) {
            let week_index = Math.floor(i / 7);
            month_days[week_index]
                ? (month_days[week_index] = month_days[week_index])
                : (month_days[week_index] = []);
            let week_day = i - week_index * 7;
            console.log(week_day);
            if (i >= first_day && i < last_day) {
                let d = new Date().setDate(i);
                console.log("date", d);
                month_days[week_index][week_day] = new Date().setDate(i-1);
            } else {
                month_days[week_index][week_day] = undefined;
            }
        }
        month_days = month_days;
        console.log(month_days);
    };
    const get_date = (date) => {
        return date ? new Date(date).getDate() : "X";
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="time" on:click={toggleMenu}>
    <span class="month">{month}</span>
    <span class="clock">{clock}</span>
    <div class="time-content" class:show>
        <div class="col">
            <div class="row">
            {#each week_days as wd }
                <div class="day-box">{wd}</div>
            {/each}
        </div>
            {#each Array(6) as _, week_idx}
                <div class="row">
                    {#each Array(7) as __, day_idx}
                    <div class="day-box">
                        {#if month_days[week_idx]}
                            {@const d = month_days[week_idx][day_idx]}
                            {get_date(d)}
                        {:else}
                            X
                        {/if}
                    </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .col {
        display: flex;
        flex-direction: column;
    }
    .row {
        display: flex;
        flex-direction: row;
    }
    .time {
        position: relative;
        display: inline-block;
        padding: 5px 10px;
        cursor: pointer;
    }
    .day-box{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        width: 20px;
        border: 1px solid lightblue;
        margin: 2px;
    }
    .time-content {
        display: none;
        position: absolute;
        width: 740px;
        height: 300px;
        top: 35px;
        left: -330px;
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
