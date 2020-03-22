<template>
    <div class="userPage">
        <div class="userNameDiv">
            <h1 class="userName">{{ username }}<span class="usernum">#{{ usernum }}</span></h1>
            <div class="userUnderline"></div>
        </div>
        <div class="infoDiv">
            <p>Status: {{ online }}</p>
            <p>User ID: {{ id }}</p>
            <p>Message count: {{ messageCount }}</p>
        </div>
        <router-link to="/login">
            <div class="goLogin">
                Logout
            </div>
        </router-link>
    </div>
</template>

<script>
    import "../assets/colorVars.css";
    import {config} from "../assets/config.js";
    import xhr from "xhr";
    import {setWsHeartbeat} from "ws-heartbeat/client";

    export default {
        name: "UserPage",
        props: {
            username: String,
            usernum: String
        },
        data() {
            return {
                online: "offline",
                id: 0,
                messageCount: 0,
                socket: new WebSocket(config.wsUrl)
            }
        },
        methods: {
            checkPromise (username, usernum, type) {
                let url = "";
                if (type === "status") {
                    url = config.serverUrl + "/userInfo/status/" + username + "/" + usernum;
                } else if (type === "id") {
                    url = config.serverUrl + "/userInfo/id/" + username + "/" + usernum;
                } else if (type === "messageCount") {
                    url = config.serverUrl + "/userInfo/messageCount/" + username + "/" + usernum;
                }
                return new Promise((resolve) => {
                    xhr({
                        method: "get",
                        uri: url,
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
            async checkStatus() {
                const username = localStorage.getItem("username");
                const usernum = Number(localStorage.getItem("usernum"));
                return await this.checkPromise(username, usernum, "status");
            },
            async checkId() {
                const username = localStorage.getItem("username");
                const usernum = Number(localStorage.getItem("usernum"));
                return await this.checkPromise(username, usernum, "id");
            },
            async checkMessageCount() {
                const username = localStorage.getItem("username");
                const usernum = Number(localStorage.getItem("usernum"));
                return await this.checkPromise(username, usernum, "messageCount");
            },
        },
        async mounted() {
            setWsHeartbeat(this.socket, '{"kind":"ping"}', {
                pingTimeout: 60000, // in 60 seconds, if no message accepted from server, close the connection.
                pingInterval: 25000, // every 25 seconds, send a ping message to the server.
            });
            this.online = await this.checkStatus();
            this.id = await this.checkId();
            this.messageCount = await this.checkMessageCount();
            const self = this;
            this.socket.onmessage = async (data) => {
                if (data.data !== '{"kind":"pong"}') {
                    const [category, message] = JSON.parse(data.data);
                    if (category === "message") {
                        if (+self.id === +message.user.id) {
                            self.messageCount++;
                        }
                    }
                    if (category === "deleteMessage" || category === "deleteChannel") {
                        self.messageCount = await self.checkMessageCount();
                        self.messageCount = await self.checkMessageCount();
                    }
                    if (category === "newUser") {
                        if (Number(message.id) === Number(self.id)) {
                            self.online = "online";
                        }
                    }
                    if (category === "loseUser") {
                        if (Number(message) === Number(self.id)) {
                            self.online = "offline";
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');

    .userPage {
        height: 100%;
        width: 100%;
        min-height: 100vh;
        position: absolute;
        top: 0;
        font-family: 'Montserrat', sans-serif;
        background-color: var(--aquifer-light-1);
    }

    .userNameDiv {
        position: absolute;
        left: 5%;
        top: 5%;
        display: inline-block;
    }

    .userName {
        display: inline-block;
        margin: 0;
        font-size: 48px;
    }

    .userUnderline {
        width: 100%;
        background-color: var(--aquifer-light-2);
        border-radius: 10px;
        height: 10px;
    }

    .usernum {
        color: #68a;
        font-size: 24px;
    }

    .infoDiv {
        position: absolute;
        top: 15%;
        left: 5%;
        text-align: left;
    }

    .goLogin {
        width: 20%;
        height: 50px;
        line-height: 50px;
        position: fixed;
        bottom: 10%;
        left: 5%;
        background-color: #67AFCB;
        border-radius: 5px;
    }
</style>
