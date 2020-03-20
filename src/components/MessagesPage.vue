<template>
    <div id="messagesPage">
        <ServerList
            :servers="servers"
            @changedServer="changeServer"
        ></ServerList>
        <ChannelList
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
            <p v-if="currentUser.currentChannel === 0" style="color: var(--aquifer-text-dark-1); font-size: 4vh; font-family: Calibri, Arial, sans-serif">You are not in any text channels.</p>
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
        <NewChannelPopup
            v-if="newChannelModalDetails.modalOpen"
            :currentServer="currentUser.currentServer"
            @closeModal="closeModal('newChannel')"
        ></NewChannelPopup>
        <ChannelPopup
            v-if="channelModalDetails.modalOpen"
            @closeModal="closeModal('channel')"
            @deleteChannel="deleteChannel"
            :channel="channelModalDetails.selectedChannel"
        ></ChannelPopup>
    </div>
</template>

<script>
    /* eslint-disable */
    // import '@types/node';

    import Vue from 'vue';
    import moment from 'moment';
    import * as randomWords from "random-words";

    import {config} from "../assets/config.js";

    import "../assets/colorVars.css";

    const isOpen = ws => ws.readyState === ws.OPEN;

    import { setWsHeartbeat } from "ws-heartbeat/client";

    export default {
        name: 'MessagesPage',
        components: {
            ChannelPopup: () => import("./MessagesPageComponents/ChannelPopup.vue"),
            MessageComponent: () => import('./MessagesPageComponents/Message.vue'),
            Channel: () => import('./MessagesPageComponents/Channel.vue'),
            ChannelList: () => import('./MessagesPageComponents/ChannelList.vue'),
            MsgPopup: () => import('./MessagesPageComponents/MsgPopup.vue'),
            UserList: () => import('./MessagesPageComponents/UserList.vue'),
            ServerList: () => import('./MessagesPageComponents/ServerList.vue'),
            NewChannelPopup: () => import('./MessagesPageComponents/NewChannelPopup.vue'),
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
            newChannelModalDetails: {
                modalOpen: false,
            },
            channelModalDetails: {
                modalOpen: false,
                selectedChannel: {}
            },
            currentUser: {
                username: "DefaultUser",
                userNum: 1234,
                currentChannel: 0,
                messages: [],
                currentServer: 1,
            },
            userList: {},
            editing: false,
            editingId: 0,
            clicks: 0,
            highestId: 0,
            messages: [],
            socketConnected: false,
            pingTimeout: null,
            socket: new WebSocket(config.wsUrl)
        }),
        created() {
            window.addEventListener("beforeunload", () => {
                this.closeWebsocket();
            });
        },
        mounted() {
            // this.genName();
            this.currentUser = this.userInput;
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
                        console.log(message);
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
                }
            }
        },
        methods: {
            currentMessages() {
                return this.messages.filter(message => message.channel === this.currentUser.currentChannel);
            },
            capitalizeFLetter(string) {
                return string.replace(/^./, string[0].toUpperCase());
            },
            chatmessage() {
                if (this.currentUser.currentChannel > 0) {
                    if (this.editing === false) {
                        // Send the "pingServer" event to the server.
                        const message = document.getElementById("sendMessage").value;
                        document.getElementById("sendMessage").value = "";
                        const newMessage = {
                            user: this.currentUser,
                            message: message,
                            channel: this.currentUser.currentChannel,
                        };
                        this.sendSocket("message", newMessage);
                    } else {
                        const newMessage = {
                            msg: document.getElementById("sendMessage").value,
                            id: this.editingId,
                        };
                        this.editing = false;
                        document.getElementById("sendMessage").value = "";
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
                //TODO: make messages update upon server switch
            },
            closeWebsocket() {
                this.sendSocket("loseUser", this.currentUser);
                this.socketConnected = false;
            },
            editMessage(messageId) {
                for (let i in this.messages) {
                    if (this.messages[i].id === messageId) {
                        document.getElementById("#sendMessage").value = this.messages[i].message;
                        this.editing = true;
                        this.editingId = messageId;
                    }
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
                if (whichOne === "newChannel") {
                    this.newChannelModalDetails.modalOpen = false;
                }
                if (whichOne === "channel") {
                    this.channelModalDetails.modalOpen = false;
                }
            },
            openNewChannelModal() {
                this.newChannelModalDetails.modalOpen = true;
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
    }
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
        /* background: #9AC1EA; */
        grid-column: 5 / 18;
        grid-row: 1 / 20;
        border: solid black;
        border-width: 0 0 2px 0;
        overflow: auto;
    }

    /*#msgForm {*/
    /*    grid-column: 6 / 21;*/
    /*    grid-row: 20;*/
    /*}*/

    #sendMessage {
        /* grid-column: 2 / 20;
      grid-row: 21; */
        grid-column: 5 / 18;
        grid-row: 20;
        /* float: left; */
        /*border: solid black;*/
        /*border-width: 0 0 0 0;*/
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

    /*#submitForm {*/
    /*    display: none;*/
    /*}*/

    /*.red {*/
    /*    background-color: red;*/
    /*}*/

    /*.green {*/
    /*    background-color: green;*/
    /*}*/
</style>
