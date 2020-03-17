<template>
    <div class="loginPage">
        <div class="loginBox">
            <h2 class="loginHeader">Log in</h2>
            <input class="loginInput" v-model="username" type="text" placeholder="Username..."/>
            <input class="loginInput" v-model="password" type="password" placeholder="Password..."/>
            <div class="loginSubmit" v-on:click="loginUser">Login</div>
            <div class="loginSubmit" v-on:click="createUser">Create</div>
            <div class="xhrstatus">{{xhrstatus}}</div>
        </div>
    </div>
</template>

<script>
    import '../assets/colorVars.css';
    import xhr from "xhr";
    export default {
        name: "LoginPage",
        data () {
            return {
                username: "",
                password: "",
                xhrstatus: ""
            }
        },
        methods: {
            loginUser () {
                xhr({
                    method: "post",
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    }),
                    uri: "http://localhost:5000/login",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "<origin> | *"
                    }
                }, (err, resp, body) => {
                    if (err) throw err;
                    if (resp.statusCode !== 200) {
                        console.log(`ERROR: ${resp.statusCode}`);
                    }
                    localStorage.setItem("seshkey", body);
                })
            },
            createUser () {
                const self = this;
                xhr({
                    method: "post",
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    }),
                    uri: "http://localhost:5000/createUser",
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
                    console.log(resp);
                    self.xhrstatus = body;
                });
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    .loginPage {
        background-image: linear-gradient(160deg, var(--aquifer-medium-3) 49%, var(--aquifer-medium-2) 51%);
        min-height: 100vh;
        height: 100vh;
    }
    .loginBox {
        width: 50%;
        height: 40%;
        padding: 5%;
        border-radius: 10px;
        position: relative;
        left: 20%;
        top: 25%;
        background-color: var(--aquifer-dark-3);
        color: azure;
        text-align: left;
        font-family: Montserrat, 'Open Sans',  sans-serif;
    }
    .loginHeader {
        font-size: 48px;
        margin: 0;
    }
    .loginInput {
        margin-top: 5%;
        width: calc(100% - 20px);
        height: 30px;
        padding: 10px;
        font-size: 24px;
        background-color: var(--aquifer-light-1);
        border: 3px var(--aquifer-light-2) solid;
        border-radius: 5px;
        color: var(--aquifer-text-dark-2);
    }
    .loginSubmit {
        width: 40%;
        margin: 4%;
        height: 40px;
        line-height: 40px;
        border: 3px var(--aquifer-light-1) solid;
        text-align: center;
        display: inline-block;
        background-color: var(--aquifer-medium-4);
        transition: background-color 0.2s;
    }
    .loginSubmit:hover {
        background-color: var(--aquifer-medium-1);
    }
    .xhrstatus {
        text-align: center;
    }
</style>
