<template>
    <div class="loginPage">
        <div class="loginBox">
            <h2 class="loginHeader">Log in</h2>
            <div class="usernameInputs">
                <input class="loginUsername" v-model="username" type="text" placeholder="Username..."/>
                <input class="loginUsernum" v-model="usernum" type="text" placeholder="Usernum..."/>
            </div>
            <input class="loginInput" v-model="password" type="password" placeholder="Password..."/>
            <div class="loginSubmit" v-on:click="loginUser">Log in</div>
            <div class="loginSubmit" v-on:click="createUser">Create</div>
            <div class="loginSubmit" v-on:click="logout">Logout</div>
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
                usernum: "",
                password: "",
                xhrstatus: ""
            }
        },
        methods: {
            loginUser () {
                const self = this;
                xhr({
                    method: "post",
                    body: JSON.stringify({
                        username: this.username,
                        usernum: this.usernum,
                        password: this.password
                    }),
                    uri: "http://localhost:5000/login",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "<origin> | *"
                    }
                }, (err, resp, body) => {
                    if (err) throw err;
                    console.log(`LOGIN STATUS: ${resp.statusCode}`);
                    body = JSON.parse(body);
                    console.log(body);
                    localStorage.setItem("username", self.username);
                    localStorage.setItem("password", self.password);
                    localStorage.setItem("usernum", body.usernum);
                    localStorage.setItem("seshkey", body.seshkey);
                    this.$router.replace("/");
                })
            },
            createUser () {
                const self = this;
                xhr({
                    method: "post",
                    body: JSON.stringify({
                        username: this.username,
                        usernum: this.usernum,
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
            },
            logout () {
                const self = this;
                xhr({
                    method: "post",
                    body: JSON.stringify({
                        seshkey: localStorage.getItem("seshkey"),
                    }),
                    uri: "http://localhost:5000/logout",
                    useXDR: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                }, (err, resp) => {
                    if (err) throw err;
                    if (resp.statusCode !== 200) {
                        console.log(resp.statusCode);
                    }
                    localStorage.removeItem("seshkey");
                    self.xhrstatus = "Logout successful.";
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
        margin: 5% 0 0 5%;
        width: calc(82%);
        height: 30px;
        padding: 10px;
        font-size: 24px;
        background-color: var(--aquifer-light-1);
        border: 3px var(--aquifer-light-2) solid;
        border-radius: 5px;
        color: var(--aquifer-text-dark-2);
    }
    .loginUsername {
        margin: 5% 5% 0 0;
        width: calc(60%);
        height: 30px;
        padding: 2%;
        font-size: 24px;
        background-color: var(--aquifer-light-1);
        border: 3px var(--aquifer-light-2) solid;
        border-radius: 5px;
        color: var(--aquifer-text-dark-2);
    }
    .loginUsernum {
        margin-top: 5%;
        width: calc(20%);
        height: 30px;
        padding: 2%;
        font-size: 24px;
        background-color: var(--aquifer-light-1);
        border: 3px var(--aquifer-light-2) solid;
        border-radius: 5px;
        color: var(--aquifer-text-dark-2);
    }
    .usernameInputs {
        margin: auto;
        width: 90%;
    }
    .loginSubmit {
        width: 26%;
        margin: 5% 2.5% 2.5% 2.5%;
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
