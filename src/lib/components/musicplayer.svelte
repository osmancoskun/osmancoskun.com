<script>
    import { browser } from "$app/environment";
    import { Music, Start, SkipFwd, SkipBwd, Pause } from "$lib/images/gnome";
    import Tracks from "$lib/musics/index.json";
    import {onMount} from "svelte"
    console.log(Tracks)

    let song = 0
    $: player  = undefined
    onMount(()=>{
        if(browser){
            player = new Audio(Tracks[song].path)
        }
    })
    const play = () => {
        if (player == undefined){
            player = new Audio(Tracks[song].path)
            player.play();

        }else if(!player?.paused){
            player.pause()    
        }
        else{
            player.play()
        }
    };
    const next = () =>{
        if (song + 1 >= Tracks.length){
            song = 0
        }
        else{
            song+=1
        }
        player  == undefined ? null : player.pause()
        player = new Audio(Tracks[song].path)
        play()
    }
    
    const prev = () =>{
        if (song - 1 <= 0){
            song = Tracks.length - 1; 
        }
        else{
            song -= 1
        }
        player?.pause()
        player = new Audio(Tracks[song].path)
        play()
    }
</script>

<div class="music">
    <div class="music-div">
        <img class="music-img" src={Music} alt="" />
    </div>
    <div class="flex col player-song-info hf">
        <span class="player-artist-name">
            <b> {Tracks[song].artist} </b>
        </span>
        <span class="player-song-name">
            {Tracks[song].title}           
        </span>
    </div>
    <div class="music-player flex">
        <button

            on:click={(e) => {
                prev()
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <img src={SkipBwd} alt="" />
        </button>
        <button
            on:click={(e) => {
                play()
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <img src={player?.paused ? Start : Pause} alt="" />

        </button>
        <button
            on:click={(e) => {
                next()
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <img src={SkipFwd} alt="" />
        </button>
    </div>
</div>

<style>
    .music-div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 62px;
        width: 62px;
        border-radius: 8px;
        background-color: var(--panel-el-color);
    }
    .music-img {
        height: 28px;
        width: 28px;
    }
    .music-player {
        width: 128px;
        justify-content: space-between;
    }

    .music-player > button {
        background-color: transparent;
        border: unset;
    }

    .player-song-info {
        max-width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        font-weight: bold;
        font-size: 14px;
    }
    .player-song-name {
        font-weight: 400;
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
</style>
