<template>
    <div class="channelList">
        <Channel v-for="channel in channels" :key="channel" :channelName="channel" v-on:click.native="changeSelection(channel)" v-bind:class="{coloredBackground: channel == currentlySelected, channelHover: channel != currentlySelected}"></Channel>
    </div>
</template>

<script>
import Channel from './Channel.vue';

export default {
    name: "ChannelList",
    components: {
        Channel
    },
    data() {
        return {
            currentlySelected: null,
        }
    },
    props: {
        channels: Array
    },
    methods: {
        changeSelection (channelName) {
            this.currentlySelected = channelName;
            this.$emit("changedSelection", channelName);
            // console.log(channelName);
        }
    }
}
</script>

<style scoped>
    .channelList {
        grid-column: 2 / 6;
        grid-row: 1 / 20;
        /* background: #4B6D93; */
        background: #67AFCB;
        border: solid black;
        border-width: 0px 2px 2px 2px;
    }
    .channelHover:hover {
        background: #459DBF;
    }
    .coloredBackground {
        background: #3B8BAB;
    }
</style>