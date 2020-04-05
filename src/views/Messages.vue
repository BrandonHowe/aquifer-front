<template>
    <div class="messages">
        <MessagesPage
            :userInput="currentUser"
            v-if="loaded"
        ></MessagesPage>
    </div>
</template>

<script lang="ts">
    import MessagesPage from "../components/MessagesPage.vue";
    import xhr from "xhr";
    import {config} from '@/assets/config';
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        components: {
            MessagesPage: () => Promise.resolve(MessagesPage)
        }
    })
    export default class Messages extends Vue {
        loaded = false;
        currentUser = {};

        mounted() {
            const self = this;
            if (localStorage.getItem("seshkey")) {
                xhr({
                    method: "POST",
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

<style scoped lang="scss">

</style>
