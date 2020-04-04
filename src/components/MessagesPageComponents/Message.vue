<template>
    <div class="message">
        <p>
            <span
                class="message-username"
            >{{user.username}}</span>
            <span
                class="message-date"
            >{{formattedTime}}</span>
        </p>
        <p
            class="message-content"
        >
            <span
                v-html="formattedMsg"
            ></span>
        </p>
        <LinkPrevue
            v-for="link in previewLinks"
            :key="link"
            :url="link"
        ></LinkPrevue>
    </div>
</template>

<script lang="ts">
    import '../../assets/colorVars.css';
    import moment from 'moment';
    import LinkPrevue from 'link-prevue';
    import Vue from "vue";

    export default Vue.extend({
        name: "Message",
        components: {
            LinkPrevue
        },
        props: {
            user: Object,
            utcTime: Number,
            message: String
        },
        data () {
            return {
                previewLinks: [],
            }
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
                const underlineParsedMsg = italicsParsedMsg.replace(/(__)[^*\n]+(__)/g, x => {
                    // eslint-disable-next-line
                    const bareMessage = x.match(/[^\_]/g).join("");
                    return "<span style=\"text-decoration: underline;\">" + bareMessage + "</span>";
                });
                const strikethruParsedMsg = underlineParsedMsg.replace(/(~~)[^*\n]+(~~)/g, x => {
                    const bareMessage = x.match(/[^~]/g).join("");
                    return "<del>" + bareMessage + "</del>";
                });
                const codeParsedMsg = strikethruParsedMsg.replace(/(`)[^*\n]+(`)/g, x => {
                    const bareMessage = x.match(/[^`]/g).join("");
                    return "<code style=\"background-color: var(--aquifer-text-dark-2);\">" + bareMessage + "</code>";
                });
                return codeParsedMsg.replace(/(http:\/\/|https:\/\/)[^ <>]*/g, x => {
                    this.previewLinks.push(x);
                    return "<a target=\"_blank\" href=" + x + ">" + x + "</a>";
                });
            }
        }
    })
</script>

<style scoped>
    .message {
        width: 94%;
        background-color: var(--aquifer-medium-2);
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
