<template>
    <div id="messagesPage">
        <ServerList
            :servers="servers"
            :user="currentUser"
            @changedServer="changeServer"
            @openNewServerModal="openNewServerModal"
            @openServerModal="openServerModal"
        ></ServerList>
        <ChannelList
            :inServer="currentUser.currentServer !== 0"
            :channels="channels"
            @changedSelection="changeChannel"
            @openChannelModal="openChannelModal"
            @openNewChannelModal="openNewChannelModal"
        ></ChannelList>
        <div id="profileArea"
             v-bind:class="{
                 red: !socketConnected,
                 green: socketConnected
             }"
        >
            <router-link
                :to="'/user/' + currentUser.username + '/' + currentUser.userNum"
                class="profileRouterLink"
            >
                {{currentUser.username}}#{{currentUser.userNum}}
            </router-link>
        </div>
        <div
            id="messages"
            v-bind:style="[currentUser.currentChannel > 0 ? {'background-color': 'var(--aquifer-light-1)'} : {'background-color': 'var(--aquifer-medium-4)'}]"
        >
            <p v-if="currentUser.currentChannel === 0 && currentUser.currentServer !== 0" style="color: var(--aquifer-text-dark-1); font-size: 4vh; font-family: Calibri, Arial, sans-serif">You are not in any text channel.</p>
            <p v-if="currentUser.currentChannel === 0 && currentUser.currentServer === 0" style="color: var(--aquifer-text-dark-1); font-size: 4vh; font-family: Calibri, Arial, sans-serif">You are not in any server.</p>
            <message-component
                v-for="message in currentMessages()"
                :key="message.id"
                :user="message.user"
                :utcTime="Number(message.utcTime)"
                :message="message.message"
                @click.native="oneClick(message)"
            ></message-component>
        </div>
        <UserList
            :userList="userList"
        ></UserList>
        <input
            v-on:keydown.enter="chatmessage"
            v-model="sendMessageVal"
            id="sendMessage"
            type="text"
            autocomplete="off"
            :disabled="!(currentUser.currentChannel > 0)"
            v-bind:style="[currentUser.currentChannel > 0 ? {'background-color': 'var(--aquifer-light-2)'} : {'background-color': 'gray', 'border-color': 'gray'}]"
        />
        <MsgPopup
            v-if="msgModalDetails.modalOpen"
            @closeMsgModal="closeModal('msg')"
            @editMessage="editMessage"
            @deleteMessage="deleteMessage"
            :user="msgModalDetails.user"
            :date="Number(msgModalDetails.date)"
            :message="msgModalDetails.message"
            :msgId="msgModalDetails.id"
        ></MsgPopup>
        <NewServerPopup
            v-if="newServerModalDetails.modalOpen"
            @closeModal="closeModal('newServer')"
        ></NewServerPopup>
        <NewChannelPopup
            v-if="newChannelModalDetails.modalOpen"
            :currentServer="currentUser.currentServer"
            @closeModal="closeModal('newChannel')"
        ></NewChannelPopup>
        <ServerPopup
            v-if="serverModalDetails.modalOpen"
            @closeModal="closeModal('server')"
            @deleteServer="deleteServer"
            :server="serverModalDetails.selectedServer"
        ></ServerPopup>
        <ChannelPopup
            v-if="channelModalDetails.modalOpen"
            @closeModal="closeModal('channel')"
            @deleteChannel="deleteChannel"
            :channel="channelModalDetails.selectedChannel"
        ></ChannelPopup>
        <NewUserPopup
            v-if="newUserModalDetails.modalOpen"
            @closeModal="closeModal('newUser')"
            :usernum="currentUser.userNum"
        ></NewUserPopup>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */

    import Vue from 'vue';
    import moment from 'moment';
    import * as randomWords from "random-words";

    import {config} from "../assets/config";

    import "../assets/colorVars.css";

    import { setWsHeartbeat } from "ws-heartbeat/client";
    import xhr from "xhr";

    export default Vue.extend({
        name: 'MessagesPage',
        components: {
            ChannelPopup: () => import("./MessagesPageComponents/ChannelPopup.vue"),
            MessageComponent: () => import('./MessagesPageComponents/Message.vue'),
            Channel: () => import('./MessagesPageComponents/Channel.vue'),
            ChannelList: () => import('./MessagesPageComponents/ChannelList.vue'),
            MsgPopup: () => import('./MessagesPageComponents/MsgPopup.vue'),
            UserList: () => import('./MessagesPageComponents/UserList.vue'),
            ServerList: () => import('./MessagesPageComponents/ServerList.vue'),
            ServerPopup: () => import('./MessagesPageComponents/ServerPopup.vue'),
            NewChannelPopup: () => import('./MessagesPageComponents/NewChannelPopup.vue'),
            NewServerPopup: () => import('./MessagesPageComponents/NewServerPopup.vue'),
            NewUserPopup: () => import("./MessagesPageComponents/NewUserPopup.vue")
        },
        props: {
            userInput: Object
        },
        data: () => ({
            moment: moment,
            channels: [],
            servers: {},
            msgModalDetails: {
                modalOpen: false,
                user: null,
                date: null,
                message: null,
                id: null
            },
            newUserModalDetails: {
                modalOpen: false
            },
            newServerModalDetails: {
                modalOpen: false
            },
            newChannelModalDetails: {
                modalOpen: false,
            },
            channelModalDetails: {
                modalOpen: false,
                selectedChannel: {}
            },
            serverModalDetails: {
                modalOpen: false,
                selectedServer: {}
            },
            currentUser: {
                username: "DefaultUser",
                userNum: 1234,
                currentChannel: 0,
                messages: [],
                currentServer: 0,
            },
            userList: {},
            editing: false,
            editingId: 0,
            clicks: 0,
            highestId: 0,
            messages: [],
            socketConnected: false,
            pingTimeout: null,
            sendMessageVal: "",
            socket: new WebSocket(config.wsUrl)
        }),
        created() {
            window.addEventListener("beforeunload", () => {
                this.closeWebsocket();
            });
        },
        mounted() {
            this.currentUser = this.userInput;
            if (localStorage.getItem("newUser") === "true") {
                this.newUserModalDetails.modalOpen = true;
            }
            const self = this;
            setWsHeartbeat(this.socket, '{"kind":"ping"}', {
                pingTimeout: 60000, // in 60 seconds, if no message accepted from server, close the connection.
                pingInterval: 25000, // every 25 seconds, send a ping message to the server.
            });
            this.socket.onopen = () => {
                self.socketConnected = true;
                self.sendSocket("queryMessages", self.currentUser.currentChannel);
                self.sendSocket("queryChannels", self.currentUser.currentServer);
                self.sendSocket("queryServers", "query");
                self.sendSocket("newUser", self.currentUser);
            };
            this.socket.onclose = () => {
                self.sendSocket("loseUser", self.currentUser);
                self.socketConnected = false;
                clearTimeout(this.pingTimeout);
            };
            this.socket.onmessage = (data) => {
                if (data.data !== '{"kind":"pong"}') {
                    const [category, message] = JSON.parse(data.data);
                    if (category === "message") {
                        const messagesElement = document.getElementById("messages");
                        const isScrolledToBottom = messagesElement.scrollTop + messagesElement.clientHeight <= messagesElement.scrollHeight + 1;
                        this.sendSocket("queryMessages", self.currentUser.currentChannel);
                        setImmediate(() => {
                            const newmessagesElement = document.getElementById("messages");
                            if (isScrolledToBottom) {
                                newmessagesElement.scrollTop = newmessagesElement.scrollHeight + newmessagesElement.clientHeight;
                            }
                        });
                    }
                    if (category === "editMessage") {
                        for (const i in this.messages) {
                            if (this.messages[i].id === message.id) {
                                this.messages[i].message = message.msg;
                            }
                        }
                    }
                    if (category === "deleteMessage") {
                        this.messages.splice(message, 1);
                    }
                    if (category === "messageList") {
                        this.messages = message;
                        const messagesElement = document.getElementById("messages");
                        const isScrolledToBottom = messagesElement.scrollTop + messagesElement.clientHeight <= messagesElement.scrollHeight + 1;
                        setImmediate(() => {
                            const newmessagesElement = document.getElementById("messages");
                            if (isScrolledToBottom) {
                                newmessagesElement.scrollTop = newmessagesElement.scrollHeight + newmessagesElement.clientHeight;
                            }
                        });
                    }
                    if (category === "channelList") {
                        this.channels = message;
                    }
                    if (category === "serverList") {
                        this.servers = message;
                    }
                    if (category === "newUser") {
                        Vue.set(this.userList, message.id, message);
                    }
                    if (category === "kickUser") {
                        if (message.username === localStorage.getItem("username") && message.usernum === localStorage.getItem("usernum")) {
                            this.$router.push("/login");
                        }
                    }
                    if (category === "loseUser") {
                        Vue.set(this.userList, message, undefined);
                    }
                    if (category === "bestowId") {
                        this.currentUser.id = message;
                    }
                    if (category === "newChannel") {
                        this.channels = message;
                    }
                    if (category === "deleteChannel") {
                        this.channels = message;
                    }
                    if (category === "newServer") {
                        Vue.set(this.servers, message.id, message);
                    }
                    if (category === "deleteServer") {
                        this.servers = message;
                    }
                }
            }
        },
        methods: {
            checkPower(username: string, usernum: number) {
                return new Promise((resolve) => {
                    xhr({
                        method: "GET",
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
            currentMessages() {
                return this.messages.filter(message => message.channel === this.currentUser.currentChannel);
            },
            capitalizeFLetter(string) {
                return string.replace(/^./, string[0].toUpperCase());
            },
            chatmessage() {
                if (this.currentUser.currentChannel > 0) {
                    if (this.editing === false) {
                        const message = this.sendMessageVal;
                        this.sendMessageVal = "";
                        const newMessage = {
                            user: this.currentUser,
                            message: message,
                            channel: this.currentUser.currentChannel,
                        };
                        this.sendSocket("message", newMessage);
                    } else {
                        const newMessage = {
                            msg: this.sendMessageVal,
                            id: this.editingId,
                        };
                        this.editing = false;
                        this.sendMessageVal = "";
                        this.sendSocket("editMessage", newMessage);
                    }
                }
            },
            changeChannel(currentChannel) {
                Vue.set(this.currentUser, "currentChannel", currentChannel);
                // this.sendSocket("changedSelection", currentChannel);
                this.sendSocket("queryMessages", currentChannel);
            },
            changeServer(currentServer) {
                Vue.set(this.currentUser, "currentServer", currentServer);
                // this.sendSocket("changedServer", currentServer);
                this.sendSocket("queryChannels", currentServer);
                this.changeChannel(0);
            },
            closeWebsocket() {
                this.sendSocket("loseUser", this.currentUser);
                this.socketConnected = false;
            },
            editMessage(messageId) {
                for (let i in this.messages) {
                    if (this.messages[i].id === messageId) {
                        this.sendMessageVal = this.messages[i].message;
                        this.editing = true;
                        this.editingId = messageId;
                    }
                }
            },
            async deleteServer(serverId) {
                if (await this.checkPower(this.currentUser.username, this.currentUser.userNum) === "admin") {
                    this.changeServer(0);
                    this.sendSocket("deleteServer", serverId);
                }
            },
            deleteChannel(channelId) {
                this.changeChannel(0);
                this.sendSocket("deleteChannel", channelId);
            },
            deleteMessage(messageId) {
                this.sendSocket("deleteMessage", messageId);
            },
            closeModal(whichOne) {
                if (whichOne === "msg") {
                    this.msgModalDetails.modalOpen = false;
                }
                if (whichOne === "newServer") {
                    this.newServerModalDetails.modalOpen = false;
                }
                if (whichOne === "newChannel") {
                    this.newChannelModalDetails.modalOpen = false;
                }
                if (whichOne === "server") {
                    this.serverModalDetails.modalOpen = false;
                }
                if (whichOne === "channel") {
                    this.channelModalDetails.modalOpen = false;
                }
                if (whichOne === "newUser") {
                    this.newUserModalDetails = false;
                    localStorage.setItem("newUser", "false");
                }
            },
            async openNewServerModal() {
                if (await this.checkPower(this.currentUser.username, this.currentUser.userNum) === "admin") {
                    this.newServerModalDetails.modalOpen = true;
                }
            },
            openNewChannelModal() {
                this.newChannelModalDetails.modalOpen = true;
            },
            async openServerModal(data) {
                if (await this.checkPower(this.currentUser.username, this.currentUser.userNum) === "admin") {
                    this.serverModalDetails.selectedServer = {...data};
                    this.serverModalDetails.modalOpen = true;
                }
            },
            openChannelModal(data) {
                this.channelModalDetails.selectedChannel = data;
                this.channelModalDetails.modalOpen = true;
            },
            oneClick(message) {
                this.clicks++;
                if (this.clicks === 1) {
                    let self = this;
                    this.timer = setTimeout(function () {
                        self.clicks = 0
                    }, 700);
                } else {
                    clearTimeout(this.timer);
                    this.msgModalDetails = {
                        modalOpen: true,
                        user: {
                            username: message.user.username,
                            usernum: message.user.usernum,
                        },
                        date: message.utcTime,
                        message: message.message,
                        id: message.id,
                    };
                    this.clicks = 0;
                }
            },
            genName() {
                this.currentUser = {
                    username: randomWords({
                        exactly: 2,
                        join: "",
                        formatter: (word) => this.capitalizeFLetter(word)
                    }).join(""),
                    userNum: Math.floor(Math.random() * 9000) + 1000,
                    messages: [],
                };
                while (this.currentUser.username.length > 16) {
                    this.currentUser.username = randomWords({
                        exactly: 2,
                        join: "",
                        formatter: (word) => this.capitalizeFLetter(word)
                    }).join("");
                }
            },
            sendSocket(category, data) {
                const seshkey = localStorage.getItem("seshkey");
                this.socket.send(JSON.stringify([category, seshkey, data]));
            }
        }
    })
</script>

<style scoped>
    #messagesPage {
        grid-auto-columns: 5%;
        grid-auto-rows: 5%;
        grid-gap: 0;
        height: 100%;
        width: 100%;
        display: grid;
        position: fixed;
        top: 0;
        left: 0;
    }

    #profileArea {
        grid-column: 2 / 5;
        grid-row: 20;
        background-color: var(--aquifer-dark-3);
        border: solid black;
        border-width: 0 2px 0 2px;
        color: white;
        font-weight: bold;
        line-height: 5vh;
        font-size: 2.5vh;
    }

    #messages {
        grid-column: 5 / 18;
        grid-row: 1 / 20;
        border: solid black;
        border-width: 0 0 2px 0;
        overflow: auto;
    }

    #sendMessage {
        grid-column: 5 / 18;
        grid-row: 20;
        background: var(--aquifer-light-2);
    }

    @media only screen and (max-width: 1100px) {
        #profileArea {
            grid-column: 2 / 6;
        }

        #messages {
            grid-column: 6 / 18;
        }

        #sendMessage {
            grid-column: 6 / 18;
        }
    }
    .profileRouterLink {
        color: azure;
    }
</style>
