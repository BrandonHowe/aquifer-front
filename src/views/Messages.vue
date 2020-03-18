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
                    uri: "http://localhost:5000/loginFromSeshkey",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "<origin> | *"
                    }
                }, (err, resp, body) => {
                    if (err) throw err;
                    console.log(`STATUS: ${resp.statusCode}`);
                    body = JSON.parse(body);
                    const currentUser = {
                        username: localStorage.getItem("username"),
                        userNum: localStorage.getItem("usernum"),
                        currentChannel: body.currentchannel,
                        messages: body.messages
                    };
                    self.currentUser = currentUser;
                    self.loaded = true;
                    console.log(currentUser);
                })
            } else {
                window.location.href = "/login";
            }
        }
    }
</script>

<style scoped>

</style>
