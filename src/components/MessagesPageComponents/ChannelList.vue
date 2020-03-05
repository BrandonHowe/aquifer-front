<template>
    <div class="channelList">
        <Channel v-for="channel in channels" :key="channel.id" :channelName="channel.name" v-on:click.native="oneClick()" v-bind:class="{coloredBackground: channel.id === currentlySelected, channelHover: channel.id !== currentlySelected}"></Channel>
        <div id="newChannel" @click="newChannel">
            New Channel
        </div>
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
            currentlySelected: null,
            clicks: 0,
        }
    },
    props: {
        channels: Object
    },
    methods: {
        changeSelection (channelId) {
            this.currentlySelected = channelId;
            console.log("New channel: " + channelId);
            this.$emit("changedSelection", channelId);
            socket.send(JSON.stringify(["changedSelection", channelId]));
            // console.log(channelName);
        },
        oneClick() {
            this.changeSelection(this.currentlySelected);
            // console.log(message);
            this.clicks++;
            if(this.clicks === 1) {
                let self = this;
                this.timer = setTimeout(function() {
                    self.clicks = 0
                }, 700);
            } else {
                clearTimeout(this.timer);
                const selectedChannel = this.channels[this.currentlySelected];
                this.$emit("openChannelModal", selectedChannel);
                // console.log(this.modalDetails);
                this.clicks = 0;
            }
        },
        newChannel () {
            this.$emit("openNewChannelModal");
            // socket.send(JSON.stringify(["newChannel", {name: "blah"}]))
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
        border-width: 0 2px 2px 2px;
    }
    @media only screen and (max-width: 1100px) {
        .channelList {
            grid-column: 2 / 6;
        }
    }
    /*.channelHover {*/
    /*    transition: background-color 0.1s;*/
    /*}*/
    /*.channelHover:hover {*/
    /*    background-color: #459DBF;*/
    /*}*/
    /*.coloredBackground {*/
    /*    background-color: #3B8BAB;*/
    /*}*/
</style>