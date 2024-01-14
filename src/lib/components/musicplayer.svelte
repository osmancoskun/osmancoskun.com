<script>
    import { browser } from "$app/environment";
    import { Music, Start, SkipFwd, SkipBwd, Pause } from "$lib/images/gnome";
    import Tracks from "$lib/musics/index.json";
    import { onMount } from "svelte";

    let song = 0;
    $: player = undefined;
    onMount(() => {
        if (browser) {
            player = new Audio(Tracks[song].path);
        }
    });
    const play = () => {
        if (player == undefined) {
            player = new Audio(Tracks[song].path);
            player.play();
        } else if (!player?.paused) {
            player.pause();
        } else {
            player.play();
        }
    };
    const next = () => {
        if (song + 1 >= Tracks.length) {
            song = 0;
        } else {
            song += 1;
        }
        player == undefined ? null : player.pause();
        player = new Audio(Tracks[song].path);
        play();
    };

    const prev = () => {
        if (song - 1 <= 0) {
            song = Tracks.length - 1;
        } else {
            song -= 1;
        }
        player?.pause();
        player = new Audio(Tracks[song].path);
        play();
    };
</script>

<div
    class="flex items-center w-full rounded-2xl p-5 gap-3.5 bg-panel-el-bg-color"
>
    <div
        class="flex items-center justify-center h-16 w-16 rounded-lg bg-panel-el-color"
    >
        <img class="w-7 h-7" src={Music} alt="" />
    </div>
    <div
        class="flex flex-col h-full w-[180px] max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis break-words font-bold text-sm"
    >
        <span class="player-artist-name">
            <b> {Tracks[song].artist} </b>
        </span>
        <span class="font-normal">
            {Tracks[song].title}
        </span>
    </div>
    <div class="w-32 justify-between flex">
        <button
            on:click={(e) => {
                prev();
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <img src={SkipBwd} alt="" />
        </button>
        <button
            on:click={(e) => {
                play();
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <img src={player?.paused ? Start : Pause} alt="" />
        </button>
        <button
            on:click={(e) => {
                next();
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <img src={SkipFwd} alt="" />
        </button>
    </div>
</div>
