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
    let block = false;
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

    const formattedDate = (date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };
    const toggleMenu = () => {
        block = !block;
    };
    const get_dates = () => {
        let first_day = new Date(
            time.getFullYear(),
            time.getMonth(),
            1,
        ).getDay();
        let last_day = new Date(
            time.getFullYear(),
            time.getMonth() + 1,
            0,
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
<div
    class="px-2.5 cursor-pointer hover:bg-[#242323] hover:rounded-2xl"
    on:click={toggleMenu}
>
    <span class="mr-1.5">{month}</span>
    <span class="w-20">{clock}</span>
    <div
        class=" {block ? 'block' : 'hidden'} 
            absolute w-auto top-[35px] left-1/2 transform -translate-x-1/2 bg-panel-el-color z-10 rounded-3xl p-4"
    >
        <div class="w-full h-full">
            <div class="flex gap-3.5">
                <div class="w-full p-1">
                    <div>
                        <MusicPlayer />
                    </div>
                </div>
                <div class="border-panel-separator-color" />
                <div class="text-panel-el-text-color flex flex-col">
                    <span class="mt-2 text-sm font-bold">Thursday</span>
                    <span class="font-semibold text-xl mt-1.5"
                        >{formattedDate(time)}</span
                    >
                    <div class="flex justify-between mt-8 mb-2.5 pl-2.5 pr-2.5">
                        <img src={PanStart} alt="" />
                        <span class="text-white important">October</span>
                        <img src={PanEnd} alt="" />
                    </div>
                    <div
                        class="flex justify-center items-center flex-col w-full"
                    >
                        <div class="flex items-center justify-center">
                            {#each week_days as day}
                                <span
                                    class="flex items-center justify-center w-8 h-8 m-0.5 rounded-full text-xs font-bold"
                                >
                                    {day}
                                </span>
                            {/each}
                        </div>
                        {#each month_days as week}
                            <div class="flex items-center justify-center">
                                {#each week as day, index}
                                    <span
                                        class="flex items-center justify-center w-8 h-8 m-0.5 rounded-full text-xs font-bold"
                                        class:text-white={get_date(day) ==
                                            get_date(new Date())}
                                        class:bg-panel-el-day-active={get_date(
                                            day,
                                        ) == get_date(new Date())}
                                    >
                                        {get_date(day)}
                                    </span>
                                {/each}
                            </div>
                        {/each}
                    </div>
                    <div
                        class="flex flex-col p-4 w-[266px] justify-evenly rounded-xl mt-3.5 bg-panel-el-bg-color"
                    >
                        <span class="text-white font-extrabold">
                            <b> Today </b>
                        </span>
                        <span class="text-white font-normal"> No Events </span>
                    </div>

                    <span
                        class="w-full p-4 justify-evenly rounded-xl mt-3.5 bg-panel-el-bg-color"
                    >
                        Add world clocks...
                    </span>

                    <span
                        class="w-full p-4 justify-evenly rounded-xl mt-3.5 bg-panel-el-bg-color"
                    >
                        Select weather location...
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
