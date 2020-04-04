<template>
    <div
        class="newServerPopup"
        id="newServerPopup"
        @click="closeModal('reg')"
    >
        <div
            class="newServerPopup-content"
            @click="clickingMain = true"
        >
            <span
                class="close"
                @click="closeModal('x')"
            >&times;</span>
            <div
                class="newServerPopup-header"
            >
                <h3>Create a new server</h3>
            </div>
            <div
                class="newServerPopup-actions"
            >
                <input
                    v-model="channelName"
                    class="newServerPopupInput"
                />
                <div
                    @click="createChannel()"
                    class="newServerPopupCreate"
                >Create!
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import '@coreui/icons';
    import '../../assets/colorVars.css';
    import {config} from "../../assets/config";
    import Vue from 'vue';

    export default Vue.extend({
        name: "NewServerPopup",
        data: () => ({
            clickingMain: false,
            channelName: "",
            socket: new WebSocket(config.wsUrl)
        }),
        methods: {
            createChannel() {
                this.socket.send(JSON.stringify(["newServer", localStorage.getItem("seshkey"), {
                    name: this.channelName,
                    server: this.currentServer
                }]));
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
    })
</script>

<style scoped>
    .newServerPopup {
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
        color: #0B3241;
    }

    .newServerPopup-content {
        background-color: var(--aquifer-medium-4);
        margin: 10% auto;
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

    .newServerPopupInput {
        background-color: var(--aquifer-light-1);
        width: 80%;
        padding: 1% 5% 1% 5%;
        margin-left: 5%;
        height: 25px;
    }

    .newServerPopupCreate {
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
