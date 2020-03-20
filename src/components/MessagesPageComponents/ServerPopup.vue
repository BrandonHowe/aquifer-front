<template>
    <div class="serverPopup" id="serverPopup" @click="closeModal('reg')">
        <div class="serverPopup-content" @click="clickingMain = true">
            <span class="close" @click="closeModal('x')">&times;</span>
            <div class="serverPopup-header">
                <h3>Server options</h3>
                <p>Server name: {{server.name}}</p>
                <p>Server id: {{server.id}}</p>
            </div>
            <div class="serverPopup-actions">
                <p class="serverPopup-action" @click="deleteServer">Delete server</p>
            </div>
        </div>
    </div>
</template>

<script>
    import '@coreui/icons';
    import '../../assets/colorVars.css';

    export default {
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
    }
</script>

<style scoped>
    .serverPopup {
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
        color: var(--aquifer-text-dark-2);
        /* Black w/ opacity */
    }
    .serverPopup-content {
        background-color: var(--aquifer-medium-4);
        margin: 10% auto;
        /* 15% from the top and centered */
        height: 60%;
        padding: 20px;
        border: 1px solid #264F5F;
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
    .serverPopup-action:hover {
        background-color: var(--aquifer-light-3);
        margin: -10px;
        padding: 10px;
    }
</style>
