<template>
    <div class="msgpopup" id="msgpopup" @click="closeModal('reg')">
        <div class="msgpopup-content" @click="clickingMain = true">
            <span class="close" @click="closeModal('x')">&times;</span>
            <div class="msgpopup-header">
                <p><span class="message-username">{{user.username}}#{{user.usernum}}</span>  <span class="message-date">{{formattedDate}}</span></p>
                <p class="message-content">{{message}}</p>
                <p>Message ID: {{msgId}}</p>
            </div>
            <div class="msgpopup-actions">
                <p class="msgpopup-action" @click="editMessage">Edit message <i class="cil-energy"></i></p>
                <p class="msgpopup-action" @click="deleteMessage">Delete message <i class="cil-energy"></i></p>
            </div>
        </div>
    </div>
</template>

<script>
import '@coreui/icons';
import '../../assets/colorVars.css';
import moment from 'moment';

export default {
    name: "MsgPopup",
    props: {
        user: Object,
        date: Number,
        message: String,
        msgId: Number,
    },
    data: () => ({
        clickingMain: false,
    }),
    methods: {
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
        formattedDate () {
            return moment(this.date).calendar();
        }
    }
}
</script>

<style scoped>
.msgpopup {
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
.msgpopup-content {
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