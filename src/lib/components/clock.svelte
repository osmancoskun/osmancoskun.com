<script>
    import { onMount } from "svelte";
    import MusicPlayer from "$lib/components/musicplayer.svelte";
    import { PanStart, PanEnd } from "$lib/images/gnome";

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
    $: clock = hour + ":" + checkDigits(minute);
    $: get_dates();

    const checkDigits = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    const formattedDate = (date)=>{
        return new Intl.DateTimeFormat('en-US',{
            month:'long',
            day:'numeric',
            year:'numeric'
            
        }).format(new Date(date))
    }
    const toggleMenu = () => {
        show = !show;
    };
    const get_dates = () => {
        let first_day = new Date(
            time.getFullYear(),
            time.getMonth(),
            1
        ).getDay();
        let last_day = new Date(
            time.getFullYear(),
            time.getMonth() + 1,
            0
        ).getDate();

        for (var i = 0; i < 35; i++) {
            let week_index = Math.floor(i / 7);
            month_days[week_index]
                ? (month_days[week_index] = month_days[week_index])
                : (month_days[week_index] = []);
            let week_day = i - week_index * 7;
            if (i >= first_day && i - first_day < last_day) {
                let day = i - first_day + 1;
                month_days[week_index][week_day] = new Date().setDate(i + 1);
            } else {
                month_days[week_index][week_day] = undefined;
            }
        }
    };
    const get_date = (date) => {
        return date ? new Date(date).getDate() : "";
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="time" on:click={toggleMenu}>
    <span class="month">{month}</span>
    <span class="clock">{clock}</span>
    <div class="time-content" class:show>
        <div class="time-content-inner">
            <div class="flex row gap-4 hf wf">
                <div class="notification-box">
                    <div>
                        <MusicPlayer />
                    </div>
                </div>
                <div class="saparator" />
                <div class="date-box flex col">
                    <span class="dayname">Thursday</span>
                    <span class="full-dayname">{formattedDate(time)}</span>
                    <div class="flex month-box">
                        <img src={PanStart} alt="" />
                        <span class="month-name">October</span>
                        <img src={PanEnd} alt="" />
                    </div>
                    <div class="calendar">
                        <div class="week-days">
                            {#each week_days as day}
                                <span class="day">
                                    {day}
                                </span>
                            {/each}
                        </div>
                        {#each month_days as week}
                            <div class="week-days">
                                {#each week as day, index}
                                    <span
                                        class="day"
                                        class:day-active={get_date(day) ==
                                            get_date(new Date())}
                                        class:light-text={index != 0 &&
                                            index != week.length - 1}
                                    >
                                        {get_date(day)}
                                    </span>
                                {/each}
                            </div>
                        {/each}
                    </div>
                    <div class="event-box flex col">
                        <span class="light-text"> <b>Today</b></span>
                        <span class="light-text">No Events</span>
                    </div>
                    <div class="world-clock-box">
                        <span>Add world clocks...</span>
                    </div>
                    <div class="weather-clock-box">
                        <span>Select weather location...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .gap-4 {
        gap: 14px;
    }
    .time {
        position: relative;
        display: inline-block;
        padding: 5px 10px;
        cursor: default;
    }
    .calendar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        /*border: 1px solid red;*/
    }
    .week-days {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .day {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        margin: 2px;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
    }
    .day-active {
        background-color: var(--panel-el-day-active);
        color: white;
    }

    .time-content {
        display: none;
        position: absolute;
        width: auto;
        top: 35px;
        background-color: var(--panel-el-color);
        margin-left:auto;
        margin-right:auto;
        z-index: 1;
        border-radius: 30px;
        padding: 15px;
    }
    .time-content-inner {
        /*   border: 1px solid red; */
        height: 100%;
        width: 100%;
    }

    .music {
        display: flex;
        align-items: center;
        width: auto;
        height: 62px;
        border-radius: 15px;
        background-color: var(--panel-el-bg-color);
        padding: 19px;
        gap: 14px;
    }
    .notification-box {
        padding: 4px;
        width: 100%;
    }
    .dayname {
        margin-top: 7px;
        font-size: 15px;
        font-weight: bold;
    }
    .full-dayname {
        font-weight: bolder;
        font-size: 18px;
        margin-top: 5px;
    }
    .date-box {
        color: var(--panel-el-text-color);
    }
    .month-box {
        justify-content: space-between;
        margin-top: 30px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 10px;
    }

    .month-box > .month-name {
        color: #fff;
    }
    .event-box {
        height: 72px;
        width: 266px;
        border-radius: 12px;
        margin-top: 15px;
        justify-content: space-evenly;
        background: var(--panel-el-bg-color);
    }
    .event-box > span:nth-child(2) {
        font-weight: 400;
    }
    .event-box > span {
        padding-left: 10px;
        font-size: 15px;
    }
    .world-clock-box,
    .weather-clock-box {
        height: 43px;
        width: 266px;
        display: flex;
        align-items: center;
        border-radius: 12px;
        margin-top: 14px;
        background: var(--panel-el-bg-color);
    }
    .world-clock-box > span {
        padding-left: 10px;
    }
    .weather-clock-box > span {
        padding-left: 10px;
    }

    .light-text {
        color: #fff;
    }
    .saparator {
        border: 1px solid var(--panel-saparator-color);
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
