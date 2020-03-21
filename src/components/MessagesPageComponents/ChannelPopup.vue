<template>
    <div class="channelPopup" id="channelPopup" @click="closeModal('reg')">
        <div class="channelPopup-content" @click="clickingMain = true">
            <span class="close" @click="closeModal('x')">&times;</span>
            <div class="channelPopup-header">
                <h3>Channel options</h3>
                <p>Channel name: {{channel.name}}</p>
                <p>Channel id: {{channel.id}}</p>
            </div>
            <div class="channelPopup-actions">
                <p class="channelPopup-action" @click="deleteChannel">Delete channel</p>
            </div>
        </div>
    </div>
</template>

<script>
    import '@coreui/icons';
    import '../../assets/colorVars.css';

    //TODO: make this work with the server update

    export default {
        name: "ChannelPopup",
        props: {
            channel: Object
        },
        data: () => ({
            clickingMain: false,
        }),
        methods: {
            deleteChannel () {
                this.$emit("deleteChannel", this.channel.id);
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
    .channelPopup {
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
    .channelPopup-content {
        background-color: var(--aquifer-medium-4);
        margin: 12% auto;
        /* 15% from the top and centered */
        height: 40%;
        padding: 20px;
        width: 80%;
        border: var(--aquifer-light-1) 5px solid;
        border-radius: 10px;
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
    .channelPopup-action:hover {
         background-color: var(--aquifer-light-3);
         margin: -10px;
         padding: 10px;
     }
</style>
