<template>
    <div class="channel">
        <h3># {{channelName}}</h3>
    </div>
</template>

<script>
    import '../../assets/colorVars.css';

    export default {
        name: "Channel",
        props: {
            channelName: String
        }
    }
</script>

<style scoped lang="scss">
    .channel {
        width: 90%;
        margin: -10px 0 -10px 0;
        text-align: left;
        user-select: none;
        padding: 0 5% 0 5%;
        color: var(--aquifer-text-dark-1);
        display: block;
    }
</style>
