<template>
    <div class="userPage">
        <div class="userNameDiv">
            <h1 class="userName">{{ username }}<span class="usernum">#{{ usernum }}</span></h1>
            <div class="userUnderline"></div>
            <p>Status: {{online}}</p>
        </div>
    </div>
</template>

<script>
    import "../assets/colorVars.css";
    import {config} from "../assets/config.js";
    import xhr from "xhr";

    export default {
        name: "UserPage",
        props: {
            username: String,
            usernum: String
        },
        data() {
            return {
                online: false,
            }
        },
        methods: {
            checkStatusPromise(username, usernum) {
                return new Promise((resolve) => {
                    xhr({
                        method: "get",
                        uri: config.serverUrl + "/userStatus/" + username + "/" + usernum,
                        useXDR: true,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        }
                    }, (err, resp, body) => {
                        if (err) throw err;
                        if (resp.statusCode !== 200) {
                            console.log(resp.statusCode);
                        }
                        resolve(body);
                    });
                })
            },
            async checkStatus() {
                const username = localStorage.getItem("username");
                const usernum = Number(localStorage.getItem("usernum"));
                return await this.checkStatusPromise(username, usernum);
            },
        },
        // TODO: make online property real-time
        async mounted() {
            this.online = await this.checkStatus();
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');

    .userPage {
        height: 100%;
        width: 100%;
        min-height: 100vh;
        position: absolute;
        top: 0;
        font-family: 'Montserrat', sans-serif;
        background-color: var(--aquifer-light-1);
    }

    .userNameDiv {
        position: absolute;
        left: 5%;
        top: 5%;
        display: inline-block;
    }

    .userName {
        display: inline-block;
        margin: 0;
        font-size: 48px;
    }

    .userUnderline {
        width: 100%;
        background-color: var(--aquifer-light-2);
        border-radius: 10px;
        height: 10px;
    }

    .usernum {
        color: #68a;
        font-size: 24px;
    }
</style>
