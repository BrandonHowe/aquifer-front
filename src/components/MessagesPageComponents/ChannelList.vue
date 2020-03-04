<template>
    <div class="channelList">
        <Channel v-for="channel in channels" :key="channel" :channelName="channel" v-on:click.native="changeSelection(channel)" v-bind:class="{coloredBackground: channel == currentlySelected, channelHover: channel != currentlySelected}"></Channel>
    </div>
</template>

<script>
import Channel from './Channel.vue';

// const isOpen = ws => ws.readyState === ws.OPEN;

// PRODUCTION
// const socket = new WebSocket("wss://aquifer-social.herokuapp.com");
// DEV
const socket = new WebSocket("ws://localhost:5000");

export default {
    name: "ChannelList",
    components: {
        Channel
    },
    data() {
        return {
            currentlySelected: "general",
        }
    },
    props: {
        channels: Array
    },
    methods: {
        changeSelection (channelName) {
            this.currentlySelected = channelName;
            this.$emit("changedSelection", channelName);
            socket.send(JSON.stringify(["changedSelection", channelName]));
            // console.log(channelName);
        }
    }
}
</script>

<style scoped>
    .channelList {
        grid-column: 2 / 5;
        grid-row: 1 / 20;
        /* background: #4B6D93; */
        background-color: #67AFCB;
        border: solid black;
        border-width: 0px 2px 2px 2px;
    }
    @media only screen and (max-width: 1100px) {
        .channelList {
            grid-column: 2 / 6;
        }
    }
    .channelHover {
        transition: background-color 0.1s;
    }
    .channelHover:hover {
        background-color: #459DBF;
    }
    .coloredBackground {
        background-color: #3B8BAB;
    }
</style>