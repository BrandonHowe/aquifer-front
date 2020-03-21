<template>
    <MessagesPage :userInput="currentUser" v-if="loaded"></MessagesPage>
</template>

<script>
    import MessagesPage from "../components/MessagesPage.vue";
    import xhr from "xhr";

    export default {
        name: "Messages",
        components: {
            MessagesPage
        },
        data() {
            return {
                authenticated: false,
                currentUser: {},
                loaded: false,
            }
        },
        mounted() {
            const self = this;
            if (localStorage.getItem("seshkey")) {
                xhr({
                    method: "post",
                    body: JSON.stringify({
                        seshkey: localStorage.getItem("seshkey")
                    }),
                    uri: config.serverUrl + "/loginFromSeshkey",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "<origin> | *"
                    }
                }, (err, resp, body) => {
                    if (err) throw err;
                    body = JSON.parse(body);
                    self.currentUser = {
                        username: localStorage.getItem("username"),
                        userNum: localStorage.getItem("usernum"),
                        currentChannel: body.currentchannel,
                        messages: body.messages,
                        currentServer: body.currentserver
                    };
                    self.loaded = true;
                })
            } else {
                this.$router.replace("/login");
            }
        }
    }
</script>

<style scoped>

</style>
