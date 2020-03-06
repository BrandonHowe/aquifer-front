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

<style scoped>
    .channel {
        width: 90%;
        /* height: 20px; */
        margin: -10px 0px -10px 0px;
        text-align: left;
        user-select: none;
        padding: 0px 5% 0px 5%;
        color: var(--aquifer-text-dark-1);
        /* text-overflow: clip; */
        /* white-space: nowrap; */
        /* overflow: hidden; */
        display: block;
    }
</style>