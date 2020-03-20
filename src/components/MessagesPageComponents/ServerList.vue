<template>
    <div class="serverList">
        <Server
            v-for="server in servers"
            :key="server.id"
            :name="server.name"
            v-on:click.native="oneClick(server.id)"
            v-bind:class="{
                coloredBackground: server.id === currentlySelected,
                channelHover: server.id !== currentlySelected
            }"
        >
        </Server>
        <div v-if="userPower === 'admin'" class="addServer">
            <p class="addServerText">+</p>
        </div>
    </div>
</template>

<script>
    import Server from './Server.vue';
    import xhr from "xhr";
    import {config} from "../../assets/config";

    export default {
        name: "ServerList",
        components: {
            Server
        },
        props: {
            servers: Object,
            user: Object,
        },
        data() {
            return {
                currentlySelected: 1,
                clicks: {
                    num: 0,
                    server: 0,
                },
                userPower: "",
            }
        },
        async mounted() {
            this.userPower = await this.checkPower(this.user.username, this.user.userNum);
        },
        methods: {
            checkPower(username, usernum) {
                return new Promise((resolve) => {
                    xhr({
                        method: "get",
                        uri: config.serverUrl + "/userPower/" + username + "/" + usernum,
                        useXDR: true,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        }
                    }, (err, resp, body) => {
                        if (err) throw err;
                        if (resp.statusCode !== 200) {
                            console.log(resp.statusCode);
                        }
                        console.log(`Body: ${body}`);
                        resolve(body);
                    });
                })
            },
            changeServer(serverId) {
                this.currentlySelected = serverId;
                this.$emit("changedServer", serverId);
                // console.log(channelName);
            },
            oneClick(newServerId) {
                this.changeServer(newServerId);
                // console.log(this.clicks);
                this.clicks.num++;
                if (this.clicks.num === 1) {
                    let self = this;
                    this.clicks.server = newServerId;
                    this.timer = setTimeout(function () {
                        self.clicks.num = 0
                    }, 700);
                } else {
                    if (newServerId === this.clicks.server) {
                        clearTimeout(this.timer);
                        const selectedChannel = this.channels[this.currentlySelected];
                        this.$emit("openChannelModal", selectedChannel);
                        // console.log(this.modalDetails);
                        this.clicks.num = 0;
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .serverList {
        grid-column: 1;
        grid-row: 1 / 21;
        /* background-color: #044289; */
        background-color: var(--aquifer-dark-2);
    }
    .addServer {
        width: 80%;
        border-radius: 50%;
        padding-top: 40%;
        padding-bottom: 40%;
        margin: 10%;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        background-color: var(--aquifer-medium-3);
    }
    .addServer:hover {
        background-color: var(--aquifer-medium-2);
    }
    .addServerText {
        margin: 0;
        position: absolute;
        top: 15%;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 4vh;
        line-height: calc(100%);
    }
    .channelHover {
        background-color: var(--aquifer-medium-3);
        transition: background-color 0.1s;
    }
    .channelHover:hover {
        background-color: var(--aquifer-medium-2);
    }
    .coloredBackground {
        background-color: var(--aquifer-medium-1);
    }
</style>
