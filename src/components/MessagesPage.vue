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

    //TODO: add double click functionality for messages

    import Vue from 'vue';
    import moment from 'moment';
    import * as randomWords from "random-words";

    // import MessageComponent from './MessagesPageComponents/Message.vue';
    // import Channel from './MessagesPageComponents/Channel.vue';
    // import ChannelList from './MessagesPageComponents/ChannelList.vue';
    // import MsgPopup from './MessagesPageComponents/MsgPopup.vue';
    // import NewChannelPopup from './MessagesPageComponents/NewChannelPopup.vue';
    // import UserList from './MessagesPageComponents/UserList.vue';
    // import ChannelPopup from "./MessagesPageComponents/ChannelPopup.vue";

    const isOpen = ws => ws.readyState === ws.OPEN;

    // PRODUCTION
    // const socket = new WebSocket("wss://aquifer-social.herokuapp.com");
    // DEV
    const socket = new WebSocket("ws://localhost:5000");
    // Vue.use(VueNativeSock, "ws://localhost:6600", {
    // reconnection: true
    // })

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
                currentChannel: 1,
            },
            userList: {},
            editing: false,
            editingId: 0,
            clicks: 0,
            highestId: 0,
            messages: [

            ],
            // currentMessages: [],
            socketConnected: false,
        }),
        // computed: {
        //     currentMessages: function () {
        //         return this.messages.filter(message => message.channel == this.currentUser.currentChannel);
        //     },
        // },
        created () {
            window.addEventListener("beforeunload", () => {
                this.closeWebsocket();
            });
        },
        mounted () {
            this.genName();
            const self = this;
            socket.onopen = () => {
                this.socketConnected = true;
                socket.send(JSON.stringify(["queryMessages", "query"]));
                socket.send(JSON.stringify(["queryChannels", "query"]));
                socket.send(JSON.stringify(["newUser", self.currentUser]));
                // console.log(this.messages);
            };
            socket.onclose = () => {
                socket.send(JSON.stringify(["loseUser", self.currentUser]));
                this.socketConnected = false;
            };
            socket.onmessage = (data) => {
                const [category, message] = JSON.parse(data.data);
                // console.log(message);
                if (category === "message") {
                    const messagesElement = document.getElementById("messages");
                    const isScrolledToBottom = messagesElement.scrollTop + messagesElement.clientHeight <= messagesElement.scrollHeight + 1;
                    socket.send(JSON.stringify(["queryMessages", "query"]));
                    // console.log((messagesElement.scrollTop + messagesElement.clientHeight) + "|" + messagesElement.scrollHeight);
                    setImmediate(() => {
                        const newmessagesElement = document.getElementById("messages");
                        // console.log("NEW: " + newmessagesElement.scrollTop + "|" + newmessagesElement.scrollHeight);
                        if (isScrolledToBottom) {
                            newmessagesElement.scrollTop = newmessagesElement.scrollHeight + newmessagesElement.clientHeight;
                        }
                        // console.log("NEW 2: " + (newmessagesElement.scrollTop + messagesElement.clientHeight) + "|" + newmessagesElement.scrollHeight);
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
                    // this.highestId = message.length;
                    const messagesElement = document.getElementById("messages");
                    const isScrolledToBottom = messagesElement.scrollTop + messagesElement.clientHeight <= messagesElement.scrollHeight + 1;
                    setImmediate(() => {
                        const newmessagesElement = document.getElementById("messages");
                        // console.log("NEW: " + newmessagesElement.scrollTop + "|" + newmessagesElement.scrollHeight);
                        if (isScrolledToBottom) {
                            newmessagesElement.scrollTop = newmessagesElement.scrollHeight + newmessagesElement.clientHeight;
                        }
                        // console.log("NEW 2: " + (newmessagesElement.scrollTop + messagesElement.clientHeight) + "|" + newmessagesElement.scrollHeight);
                    });
                }
                if (category === "channelList") {
                    this.channels = message;
                }
                if (category === "newUser") {
                    // console.log(message);
                    this.userList = message;
                    // console.log(this.userList);
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
        },
        methods: {
            currentMessages() {
                return this.messages.filter(message => message.channel === this.currentUser.currentChannel);
            },
            capitalizeFLetter(string) {
                return string.replace(/^./, string[0].toUpperCase());
            },
            chatmessage() {
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
                if(this.clicks === 1) {
                    let self = this;
                    this.timer = setTimeout(function() {
                        self.clicks = 0
                    }, 700);
                } else{
                    clearTimeout(this.timer);
                    this.modalDetails = {
                        modalOpen: true,
                        user: message.user,
                        date: message.date,
                        message: message.message,
                        id: message.id,
                    };
                    this.clicks = 0;
                }
            },
            genName() {
                this.currentUser = {
                    username: randomWords({exactly: 2, join: "", formatter: (word) => this.capitalizeFLetter(word)}).join(""),
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
        background-color: #347B98;
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
        background-color: #0B3241;
        border: solid black;
        border-width: 0 2px 0 2px;
        color: white;
        font-weight: bold;
        line-height: 5vh;
    }

    #messages {
        /* background: #9AC1EA; */
        background: #B6D9E7;
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
        background: #E4F1F6;
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
