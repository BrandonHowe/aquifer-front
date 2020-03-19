<template>
    <div class="channelList">
        <Channel
            v-for="channel in channels"
            :key="channel.id"
            :channelName="channel.name"
            v-on:click.native="oneClick(channel.id)"
            v-bind:class="{
                coloredBackground: channel.id === currentlySelected,
                channelHover: channel.id !== currentlySelected
            }"
        ></Channel>
        <div id="newChannel" @click="newChannel">
            New Channel
        </div>
    </div>
</template>

<script>
import Channel from './Channel.vue';
import '../../assets/colorVars.css';

// const isOpen = ws => ws.readyState === ws.OPEN;

export default {
    name: "ChannelList",
    components: {
        Channel
    },
    data() {
        return {
            currentlySelected: 0,
            clicks: {
                num: 0,
                channel: 0,
            }
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
            // console.log(channelName);
        },
        oneClick(newChannelId) {
            this.changeSelection(newChannelId);
            // console.log(this.clicks);
            this.clicks.num++;
            if(this.clicks.num === 1) {
                let self = this;
                this.clicks.channel = newChannelId;
                this.timer = setTimeout(function() {
                    self.clicks.num = 0
                }, 700);
            } else {
                if (newChannelId === this.clicks.channel) {
                    clearTimeout(this.timer);
                    const selectedChannel = this.channels[this.currentlySelected];
                    this.$emit("openChannelModal", selectedChannel);
                    // console.log(this.modalDetails);
                    this.clicks.num = 0;
                }
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
        background-color: var(--aquifer-medium-1);
        border: solid black;
        border-width: 0 2px 2px 2px;
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
        background-color: var(--aquifer-medium-2);
    }
    .coloredBackground {
        background-color: var(--aquifer-medium-3);
    }
</style>
