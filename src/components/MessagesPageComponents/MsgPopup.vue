<template>
    <div
        class="msgpopup"
        id="msgpopup"
        @click="closeModal('reg')"
    >
        <div
            class="msgpopup-content"
            @click="clickingMain = true"
        >
            <span
                class="close"
                @click="closeModal('x')"
            >&times;</span>
            <div
                class="msgpopup-header"
            >
                <p>
                    <span
                        class="message-username"
                    >{{user.username}}#{{user.usernum}}</span>
                    <span
                        class="message-date"
                    >{{formattedDate}}</span>
                </p>
                <p
                    class="message-content"
                >{{message}}</p>
                <p>Message ID: {{msgId}}</p>
            </div>
            <div
                class="msgpopup-actions"
            >
                <p
                    v-if="modifiable"
                    class="msgpopup-action"
                    @click="editMessage"
                >
                    Edit message<i class="cil-energy"></i>
                </p>
                <p
                    v-if="modifiable"
                    class="msgpopup-action"
                    @click="deleteMessage"
                >
                    Delete message <i class="cil-energy"></i>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import '@coreui/icons';
    import '../../assets/colorVars.scss';
    import {config} from '../../assets/config';
    import xhr from "xhr";
    import moment from 'moment';
    import Vue from "vue";

    export default Vue.extend({
        name: "MsgPopup",
        props: {
            user: Object,
            date: Number,
            message: String,
            msgId: Number,
        },
        data() {
            return {
                clickingMain: false,
                modifiable: false,
            }
        },
        async mounted() {
            this.modifiable = await this.checkModifiable()
        },
        methods: {
            checkPower(username, usernum) {
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
            async checkModifiable() {
                const username = localStorage.getItem("username");
                const usernum = Number(localStorage.getItem("usernum"));
                if (this.user.username === username && this.user.usernum === usernum) {
                    return true;
                } else {
                    const power = await this.checkPower(username, usernum);
                    return power === "admin";
                }
            },
            editMessage() {
                this.$emit("editMessage", this.msgId);
                this.$emit("closeMsgModal");
                this.clickingMain = false;
            },
            deleteMessage() {
                this.$emit("deleteMessage", this.msgId);
                this.$emit("closeMsgModal");
                this.clickingMain = false;
            },
            closeModal(type) {
                if (this.clickingMain === false || type === "x") {
                    this.clickingMain = false;
                    this.$emit("closeMsgModal");
                }
            }
        },
        computed: {
            formattedDate() {
                return moment(this.date).calendar();
            },
        }
    })
</script>

<style scoped lang="scss">
    .msgpopup {
        position: fixed;
        z-index: 2;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.7);
        text-align: left;
        color: var(--aquifer-text-dark-2);
    }

    .msgpopup-content {
        background-color: var(--aquifer-medium-4);
        margin: 12% auto;
        height: 40%;
        padding: 20px;
        border: var(--aquifer-light-1) 5px solid;
        border-radius: 10px;
        width: 80%;
    }

    .close {
        color: var(--aquifer-text-dark-2);
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    .message-username {
        color: darkred;
        font-size: 20px;
    }

    .message-date {
        font-size: 10px;
        color: var(--aquifer-text-dark-2);
    }

    .message-content {
        color: azure;
    }

    .msgpopup-action:hover {
        background-color: var(--aquifer-light-3);
        margin: -10px;
        padding: 10px;
    }
</style>
