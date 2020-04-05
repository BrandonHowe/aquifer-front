<template>
    <div
        class="serverPopup"
        id="serverPopup"
        @click="closeModal('reg')"
    >
        <div
            class="serverPopup-content"
            @click="clickingMain = true"
        >
            <span
                class="close"
                @click="closeModal('x')"
            >&times;</span>
            <div
                class="serverPopup-header"
            >
                <h3>Server options</h3>
                <p>Server name: {{server.name}}</p>
                <p>Server id: {{server.id}}</p>
            </div>
            <div
                class="serverPopup-actions"
            >
                <p
                    class="serverPopup-action"
                    @click="deleteServer"
                >Delete server</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import '@coreui/icons';
    import '../../assets/colorVars.css';
    import Vue from "vue";

    export default Vue.extend({
        name: "ServerPopup",
        props: {
            server: Object
        },
        data: () => ({
            clickingMain: false,
        }),
        methods: {
            deleteServer () {
                console.log(this.server);
                this.$emit("deleteServer", this.server.id);
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

<style scoped lang="scss">
    .serverPopup {
        position: fixed;
        z-index: 2;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0, 0, 0, 0.7);
        text-align: left;
        color: var(--aquifer-text-dark-2);
    }
    .serverPopup-content {
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
    .serverPopup-action:hover {
        background-color: var(--aquifer-light-3);
        margin: -10px;
        padding: 10px;
    }
</style>
