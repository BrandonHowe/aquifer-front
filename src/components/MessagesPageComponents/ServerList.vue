<template>
    <div class="serverList">
        <Server
            v-for="server in servers"
            :key="server.id"
            :name="server.name"
            v-on:click.native="oneClick(server.id)"
            class="channelHover"
            v-bind:class="{
                coloredBackground: server.id === currentlySelected,
            }"
        >
        </Server>
        <div v-if="userPower === 'admin'" class="addServer" @click="newServer">
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
                        uri: config.serverUrl + "/userInfo/power/" + username + "/" + usernum,
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
                        const selectedServer = this.servers[this.currentlySelected];
                        this.$emit("openServerModal", selectedServer);
                        // console.log(this.modalDetails);
                        this.clicks.num = 0;
                    }
                }
            },
            newServer() {
                this.$emit("openNewServerModal");
            }
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
        border-radius: 1000px;
        /*background-color: #459DBF;*/
        padding-top: 40%;
        padding-bottom: 40%;
        margin: 10%;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        background-color: var(--aquifer-medium-3);
        transition: width 0.5s, background-color 0.3s;
    }
    .addServer:hover {
        background-color: var(--aquifer-medium-2);
    }
    .addServerText {
        margin: 0;
        position: absolute;
        top: 20%;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 2.5vw;
        line-height: calc(100%);
        user-select: none;
        border-radius: 1000px;
        z-index: 1;
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
