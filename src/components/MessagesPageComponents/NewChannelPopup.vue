<template>
    <div class="newServerPopup" id="newChannelPopup" @click="closeModal('reg')">
        <div class="newChannelPopup-content" @click="clickingMain = true">
            <span class="close" @click="closeModal('x')">&times;</span>
            <div class="newChannelPopup-header">
                <h3>Create a new channel</h3>
            </div>
            <div class="newChannelPopup-actions">
                <input
                    v-model="channelName"
                    class="newChannelPopupInput"
                />
                <div
                    @click="createChannel()"
                    class="newChannelPopupCreate"
                >Create!</div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@coreui/icons';
    import '../../assets/colorVars.css';
    import {config} from "../../assets/config.js";

    export default {
        name: "NewChannelPopup",
        props: {
            currentServer: Number,
        },
        data: () => ({
            clickingMain: false,
            channelName: "",
            socket: new WebSocket(config.wsUrl)
        }),
        methods: {
            createChannel() {
                this.socket.send(JSON.stringify(["newChannel", localStorage.getItem("seshkey"), {name: this.channelName, server: this.currentServer}]));
                this.clickingMain = false;
                this.$emit("closeModal");
            },
            closeModal(type) {
                if (this.clickingMain === false || type === "x") {
                    this.clickingMain = false;
                    this.$emit("closeModal");
                }
            }
        }
    }
</script>

<style scoped>
    .newServerPopup {
        /* display: none; */
        /* Hidden by default */
        position: fixed;
        /* Stay in place */
        z-index: 2;
        /* Sit on top */
        left: 0;
        top: 0;
        width: 100%;
        /* Full width */
        height: 100vh;
        /* Full height */
        overflow: auto;
        /* Enable scroll if needed */
        background-color: rgb(0,0,0);
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.7);
        text-align: left;
        color: #0B3241;
        /* Black w/ opacity */
    }
    .newChannelPopup-content {
        background-color: var(--aquifer-medium-4);
        margin: 12% auto;
        /* 15% from the top and centered */
        height: 40%;
        padding: 20px;
        border: var(--aquifer-light-1) 5px solid;
        border-radius: 10px;
        width: 80%;
        /* Could be more or less, depending on screen size */
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
    .newChannelPopupInput {
        background-color: var(--aquifer-light-1);
        width: 80%;
        padding: 1% 5% 1% 5%;
        margin-left: 5%;
        height: 25px;
    }
    .newChannelPopupCreate {
        width: calc(20% - 10px);
        height: 40px;
        line-height: 40px;
        padding: 5px;
        margin-top: 10px;
        margin-left: calc(40% - 5px);
        text-align: center;
        background-color: var(--aquifer-light-1);
    }
</style>
