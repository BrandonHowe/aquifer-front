<template>
    <div class="channelList">
        <Channel
            v-for="channel in channels"
            :key="channel.id"
            :channelName="channel.name"
            v-on:click.native="oneClick(channel.id)"
            v-bind:class="{
                coloredBackground: channel.id === currentlySelectedIdx,
                channelHover: channel.id !== currentlySelectedIdx
            }"
        ></Channel>
        <div
            v-if="inServer === true"
            id="newChannel"
            @click="newChannel"
        >
            New Channel
        </div>
    </div>
</template>

<script lang="ts">
    import Channel from './Channel.vue';
    import '../../assets/colorVars.css';
    import Vue from 'vue';

    export default Vue.extend({
        name: "ChannelList",
        components: {
            Channel
        },
        data() {
            return {
                currentlySelected: 0,
                currentlySelectedIdx: 0,
                clicks: {
                    num: 0,
                    channel: 0,
                }
            }
        },
        props: {
            channels: Array,
            inServer: Boolean
        },
        methods: {
            changeSelection(channelId) {
                this.currentlySelected = this.channels.findIndex(l => l.id === channelId);
                this.currentlySelectedIdx = channelId;
                this.$emit("changedSelection", channelId);
            },
            oneClick(newChannelId) {
                this.changeSelection(newChannelId);
                this.clicks.num++;
                if (this.clicks.num === 1) {
                    let self = this;
                    this.clicks.channel = newChannelId;
                    this.timer = setTimeout(function () {
                        self.clicks.num = 0
                    }, 700);
                } else {
                    if (newChannelId === this.clicks.channel) {
                        clearTimeout(this.timer);
                        const selectedChannel = this.channels[this.currentlySelected];
                        this.$emit("openChannelModal", selectedChannel);
                        this.clicks.num = 0;
                    }
                }
            },
            newChannel() {
                this.$emit("openNewChannelModal");
            }
        }
    })
</script>

<style scoped>
    .channelList {
        grid-column: 2 / 5;
        grid-row: 1 / 20;
        background-color: var(--aquifer-medium-1);
        border: solid black;
        border-width: 0 2px 2px 2px;
    }

    @media only screen and (max-width: 1100px) {
        .channelList {
            grid-column: 2 / 6;
        }
    }

    #newChannel {
        user-select: none;
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
