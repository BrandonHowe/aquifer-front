<template>
    <div
        class="channelPopup"
        id="channelPopup"
        @click="closeModal('reg')"
    >
        <div
            class="channelPopup-content"
            @click="clickingMain = true"
        >
            <span
                class="close"
                @click="closeModal('x')"
            >&times;</span>
            <div
                class="channelPopup-header"
            >
                <h3>Channel options</h3>
                <p>Channel name: {{channel.name}}</p>
                <p>Channel id: {{channel.id}}</p>
            </div>
            <div
                class="channelPopup-actions"
            >
                <p
                    class="channelPopup-action"
                    @click="deleteChannel"
                >Delete channel</p>
            </div>
        </div>
    </div>
</template>

<script>
    import '@coreui/icons';
    import '../../assets/colorVars.css';

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

<style scoped lang="scss">
    .channelPopup {
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
    .channelPopup-content {
        background-color: var(--aquifer-medium-4);
        margin: 12% auto;
        height: 40%;
        padding: 20px;
        width: 80%;
        border: var(--aquifer-light-1) 5px solid;
        border-radius: 10px;
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
