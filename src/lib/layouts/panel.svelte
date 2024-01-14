<script>
    import Clock from "$lib/components/clock.svelte";
    import Panel from "$lib/components/panel.svelte";
</script>

<div class="panel">
    <span class="activity">Activities</span>
    <span>
        <Clock />
    </span>
    <Panel />
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
</style>
