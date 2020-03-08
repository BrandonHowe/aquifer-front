<template>
    <div id="messagesPage">
        <div id="servers">

        </div>
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
            {{currentUser.username}}#{{currentUser.userNum}}
        </div>
        <div id="messages">
            <message-component
                v-for="message in currentMessages()"
                :key="message.id"
                :user="message.user"
                :date="message.date"
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
            :date="msgModalDetails.date"
            :message="msgModalDetails.message"
            :msgId="msgModalDetails.id"
        ></MsgPopup>
        <NewChannelPopup
            v-if="newChannelModalDetails.modalOpen"
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

    import "../assets/colorVars.css";

    // import MessageComponent from './MessagesPageComponents/Message.vue';
    // import Channel from './MessagesPageComponents/Channel.vue';
    // import ChannelList from './MessagesPageComponents/ChannelList.vue';
    // import MsgPopup from './MessagesPageComponents/MsgPopup.vue';
    // import NewChannelPopup from './MessagesPageComponents/NewChannelPopup.vue';
    // import UserList from './MessagesPageComponents/UserList.vue';
    // import ChannelPopup from "./MessagesPageComponents/ChannelPopup.vue";

    const isOpen = ws => ws.readyState === ws.OPEN;

    import { setWsHeartbeat } from "ws-heartbeat/client";
    // PRODUCTION
    // const socket = new WebSocket("wss://aquifer-social.herokuapp.com");
    // DEV
    const socket = new WebSocket("ws://localhost:5000");
    setWsHeartbeat(socket, '{"kind":"ping"}', {
        pingTimeout: 60000, // in 60 seconds, if no message accepted from server, close the connection.
        pingInterval: 25000, // every 25 seconds, send a ping message to the server.
    });

    export default {
        name: 'MessagesPage',
        components: {
            ChannelPopup: () => import("./MessagesPageComponents/ChannelPopup.vue"),
            MessageComponent: () => import('./MessagesPageComponents/Message.vue'),
            Channel: () => import('./MessagesPageComponents/Channel.vue'),
            ChannelList: () => import('./MessagesPageComponents/ChannelList.vue'),
            MsgPopup: () => import('./MessagesPageComponents/MsgPopup.vue'),
            UserList: () => import('./MessagesPageComponents/UserList.vue'),
            NewChannelPopup: () => import('./MessagesPageComponents/NewChannelPopup.vue'),
        },
        data: () => ({
            moment: moment,
            channels: {},
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
            },
            userList: {},
            editing: false,
            editingId: 0,
            clicks: 0,
            highestId: 0,
            messages: [],
            // currentMessages: [],
            socketConnected: false,
            pingTimeout: null,
        }),
        // computed: {
        //     currentMessages: function () {
        //         return this.messages.filter(message => message.channel == this.currentUser.currentChannel);
        //     },
        // },
        created() {
            window.addEventListener("beforeunload", () => {
                this.closeWebsocket();
            });
        },
        mounted() {
            this.genName();
            const self = this;
            socket.onopen = () => {
                this.socketConnected = true;
                // this.heartbeat();
                socket.send(JSON.stringify(["queryMessages", "query"]));
                socket.send(JSON.stringify(["queryChannels", "query"]));
                console.log(self.currentUser);
                socket.send(JSON.stringify(["newUser", self.currentUser]));
            };
            socket.onclose = () => {
                socket.send(JSON.stringify(["loseUser", self.currentUser]));
                this.socketConnected = false;
                clearTimeout(this.pingTimeout);
            };
            socket.onmessage = (data) => {
                if (data.data !== '{"kind":"pong"}') {
                    const [category, message] = JSON.parse(data.data);
                    if (category === "message") {
                        const messagesElement = document.getElementById("messages");
                        const isScrolledToBottom = messagesElement.scrollTop + messagesElement.clientHeight <= messagesElement.scrollHeight + 1;
                        socket.send(JSON.stringify(["queryMessages", "query"]));
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
                    if (category === "newUser") {
                        this.userList = message;
                    }
                    if (category === "loseUser") {
                        this.userList = message;
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
            // heartbeat() {
            //     console.log("Heartbeat");
            //     clearTimeout(this.pingTimeout);
            //     socket.send("ping");
            //     this.pingTimeout = setTimeout(() => {
            //         this.terminate();
            //     }, 30000 + 1000);
            // },
            currentMessages() {
                return this.messages.filter(message => message.channel === this.currentUser.currentChannel);
            },
            capitalizeFLetter(string) {
                return string.replace(/^./, string[0].toUpperCase());
            },
            chatmessage() {
                console.log("Current channel: " + this.currentUser.currentChannel);
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
                        socket.send(JSON.stringify(["message", newMessage]));
                    } else {
                        const newMessage = {
                            msg: document.getElementById("sendMessage").value,
                            id: this.editingId,
                        };
                        this.editing = false;
                        document.getElementById("sendMessage").value = "";
                        socket.send(JSON.stringify(["editMessage", newMessage]));
                    }
                }
            },
            changeChannel(currentChannel) {
                Vue.set(this.currentUser, "currentChannel", currentChannel);
            },
            closeWebsocket() {
                socket.send(JSON.stringify(["loseUser", this.currentUser]));
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
                socket.send(JSON.stringify(["deleteChannel", channelId]));
            },
            deleteMessage(messageId) {
                socket.send(JSON.stringify(["deleteMessage", messageId]));
            },
            closeModal(whichOne) {
                if (whichOne === "msg") {
                    console.log("close");
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
                console.log(data);
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
                    console.log("Double click successful");
                    clearTimeout(this.timer);
                    this.msgModalDetails = {
                        modalOpen: true,
                        user: {
                            username: message.user.username,
                            usernum: message.user.userNum,
                        },
                        date: message.date,
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
                    userNum: Math.floor(Math.random() * 9000) + 1000
                };
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
        display: grid;
    }

    #servers {
        grid-column: 1;
        grid-row: 1 / 21;
        /* background-color: #044289; */
        background-color: var(--aquifer-dark-2);
    }

    /*#channels {*/
    /*    grid-column: 2 / 5;*/
    /*    grid-row: 1 / 20;*/
    /*    background: #0f6dbf;*/
    /*    border: solid black;*/
    /*    border-width: 0 2px 2px 2px;*/
    /*}*/

    #profileArea {
        grid-column: 2 / 5;
        grid-row: 20;
        background-color: var(--aquifer-dark-3);
        border: solid black;
        border-width: 0 2px 0 2px;
        color: white;
        font-weight: bold;
        line-height: 5vh;
    }

    #messages {
        /* background: #9AC1EA; */
        background: var(--aquifer-light-1);
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
