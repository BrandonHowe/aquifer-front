<template>
  <div id="messagesPage">
    <div id="servers">

    </div>
    <ChannelList :channels="channels" @changedSelection="changeChannel"></ChannelList>
    <div id="profileArea" v-bind:class="{red: !socketConnected, green: socketConnected}">
        {{currentUser.username}}#{{currentUser.usernum}}
        <!-- {{userList}} -->
    </div>
    <div id="messages">
        <message-component v-for="message in currentMessages" :key="message.id" :user="message.user" :date="message.date" :message="message.message" @click.native="oneClick(message)"></message-component>
    </div>
    <UserList :userList="userList"></UserList>
    <input v-on:keydown.enter="chatmessage" id="sendMessage" type="text" autocomplete="off" />
    <MsgPopup v-if="modalDetails.modalOpen" @closeModal="closeModal" @editMessage="editMessage" @deleteMessage="deleteMessage" :user="modalDetails.user" :date="modalDetails.date" :message="modalDetails.message" :msgId="modalDetails.id"></MsgPopup>
  </div>
</template>

<script>
/* eslint-disable */
// import '@types/node';
import $ from 'jquery';
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import * as randomWords from "random-words";
// import VueNativeSock from 'vue-native-websocket';

import MessageComponent from './MessagesPageComponents/Message.vue';
import Channel from './MessagesPageComponents/Channel.vue';
import ChannelList from './MessagesPageComponents/ChannelList.vue';
import MsgPopup from './MessagesPageComponents/MsgPopup.vue';
import UserList from './MessagesPageComponents/UserList.vue';

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
        MessageComponent,
        Channel,
        ChannelList,
        MsgPopup,
        UserList,
    },
    data: () => ({
        moment: moment,
        channels: [
            "general",
            "offtopic",
            "the best channel in the world"
        ],
        modalDetails: {
            modalOpen: false,
            user: null,
            date: null,
            message: null,
            id: null
        },
        currentUser: {
            username: "DefaultUser",
            usernum: 1234,
            currentChannel: "general",
        },
        userList: {},
        editing: false,
        editingId: 0,
        clicks: 0,
        highestId: 0,
        messages: [
            
        ],
        // currentMessages: [

        // ],
        socketConnected: false,
    }),
    computed: {
        currentMessages: function () {
            return this.messages.filter(message => message.channel === this.currentUser.currentChannel);
        },
    },
    created () {
        window.addEventListener("beforeunload", (event) => {
            this.closeWebsocket();
        });
    },
    mounted () {
        this.genName();
        const self = this;
        socket.onopen = () => {
            this.socketConnected = true;
            socket.send(JSON.stringify(["queryMessages", "query"]));
            socket.send(JSON.stringify(["newUser", self.currentUser]));
        };
        socket.onclose = () => {
            socket.send(JSON.stringify(["loseUser", self.currentUser]))
            this.socketConnected = false;
        };
        socket.onmessage = (data) => {
            // console.log(JSON.parse(data.data));
            // console.log(data.data);
            const [category, message] = JSON.parse(data.data);
            console.log(message);
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
                this.highestId = message.length;
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
        }
    },
    methods: {
        capitalizeFLetter(string) { 
            return string.replace(/^./, string[0].toUpperCase()); 
        },
        chatmessage() {
            if (this.editing == false) {
                // Send the "pingServer" event to the server.
                const message = $("#sendMessage").val();
                $("#sendMessage").val("");
                const newMessage = {
                    user: this.currentUser,
                    message: message,
                    channel: this.currentUser.currentChannel,
                }
                socket.send(JSON.stringify(["message", newMessage]));
            } else {
                const newMessage = {
                    msg: $("#sendMessage").val(),
                    id: this.editingId,
                }
                this.editing = false;
                $("#sendMessage").val("");
                socket.send(JSON.stringify(["editMessage", newMessage]));
            }
        },
        changeChannel(currentChannel) {
            this.currentUser.currentChannel = currentChannel;
            // this.currentMessages = [];
            // for (let message of this.messages) {
            //     if (message.channel == this.currentChannel) {
            //         this.currentMessages.push(message);
            //     }
            // }
        },
        closeWebsocket() {
            socket.send(JSON.stringify(["loseUser", this.currentUser]))
            this.socketConnected = false;
        },
        editMessage(messageId) {
            for (let i in this.messages) {
                if (this.messages[i].id == messageId) {
                    $("#sendMessage").val(this.messages[i].message);
                    this.editing = true;
                    this.editingId = messageId;
                }
            }
        },
        deleteMessage(messageId) {
            socket.send(JSON.stringify(["deleteMessage", messageId]));
        },
        closeModal() {
            this.modalDetails.modalOpen = false;
        },
        oneClick(message) {
            // console.log(message);
            this.clicks++;
            if(this.clicks === 1) {
                var self = this
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
                }
                // console.log(this.modalDetails);
                this.clicks = 0;
            }
        },
        genName() {
            this.currentUser = {
                username: randomWords({exactly: 2, join: "", formatter: (word) => this.capitalizeFLetter(word)}).join(""), 
                usernum: Math.floor(Math.random() * 9000) + 1000
            };
            console.log(this.currentUser);
        }
    }
}
</script>

<style>
#messagesPage {
    grid-auto-columns: 5%;
    grid-auto-rows: 5%;
    grid-gap: 0px;
    height: 100%;
    display: grid;
}
#servers {
    grid-column: 1;
    grid-row: 1 / 21;
    /* background-color: #044289; */
    background-color: #347B98;
}

#channels {
    grid-column: 2 / 5;
    grid-row: 1 / 20;
    background: #0f6dbf;
    border: solid black;
    border-width: 0px 2px 2px 2px;
}

#profileArea {
    grid-column: 2 / 5;
    grid-row: 20;
    background-color: #0B3241;
    border: solid black;
    border-width: 0px 2px 0px 2px;
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
    border-width: 0px 0px 2px 0px;
    overflow: auto;
}

#msgForm {
    grid-column: 6 / 21;
    grid-row: 20;
}

#sendMessage {
    /* grid-column: 2 / 20;
  grid-row: 21; */
    grid-column: 5 / 18;
    grid-row: 20;
    /* float: left; */
    border: solid black;
    border-width: 0px 0px 0px 0px;
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

#submitForm {
    display: none;
}

.red {
    background-color: red;
}

.green {
    background-color: green;
}
</style>
