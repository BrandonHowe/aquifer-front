<template>
    <div class="message">
        <p><span class="message-username">{{user.username}}</span> <span class="message-date">{{formattedTime}}</span></p>
        <p class="message-content"><span v-html="formattedMsg"></span></p>
    </div>
</template>

<script>
    import '../../assets/colorVars.css';
    import moment from 'moment';

    export default {
        name: "Message",
        props: {
            user: Object,
            utcTime: Number,
            message: String
        },
        computed: {
            formattedTime () {
                return moment(this.utcTime).calendar();
            },
            formattedMsg () {
                const boldParsedMsg = this.message.replace(/(\*\*)[^*\n]+(\*\*)/g, x => {
                    const bareMessage = x.match(/[^*]/g).join("");
                    return "<strong>" + bareMessage + "</strong>";
                });
                const italicsParsedMsg = boldParsedMsg.replace(/(\*)[^*\n]+(\*)/g, x => {
                    const bareMessage = x.match(/[^*]/g).join("");
                    return "<em>" + bareMessage + "</em>";
                });
                return italicsParsedMsg.replace(/(http:\/\/|https:\/\/)[^ ]*/g, x => {
                    return "<a target=\"_blank\" href=" + x + ">" + x + "</a>";
                });
            }
        }
        // data: () => ({
        //     clicks: 0
        // }),
    }
</script>

<style scoped>
    .message {
        width: 94%;
        background-color: var(--aquifer-medium-2);
        /* height: 50px; */
        text-align: left;
        padding: 10px 3% 10px 3%;
        word-wrap: break-word;
    }

    .message:hover {
        background-color: var(--aquifer-dark-1);
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
        color: #ccc;
    }
</style>
