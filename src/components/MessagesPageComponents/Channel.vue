<template>
    <div class="channel">
        <h3># {{channelName}}</h3>
    </div>
</template>

<script lang="ts">
    import '../../assets/colorVars.css';
    import Vue from 'vue';

    export default Vue.extend({
        name: "Channel",
        props: {
            channelName: String
        }
    })
</script>

<style scoped>
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
