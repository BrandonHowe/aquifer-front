<template>
    <div class="home">
        <h1
            class="heading"
        >Aquifer</h1>
        <router-link
            class="openbutton"
            to="/app"
        >
            Open
        </router-link>
        <div
            class="maintext"
        >
            <h2 class="elevatorpitch">The new open source, water based social media.</h2>
            <h3 class="description">Aquifer is an easy way to chat online, whether it is for school, work, or fun.</h3>
        </div>
        <div
            class="linkButtons"
        >
            <router-link
                class="routerLink"
                to="/app"
            >
                <div
                    class="linkButton messagesButton"
                >
                    Get started!
                </div>
            </router-link>
            <router-link
                class="routerLink"
                to="/about"
            >
                <div
                    class="linkButton aboutButton"
                >
                    About Aquifer
                </div>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: "Home"
    })
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');

    .home {
        width: 100%;
        min-height: 100vh;
        background-color: #67AFCB;
        color: #0B3241;
    }

    .heading {
        font-family: Montserrat, Calibri, sans-serif;
        font-size: 60px;
        margin: 0;
        position: relative;
        top: 7vh;
        left: 5%;
        text-align: left;
    }

    .maintext {
        font-family: Calibri, Arial, sans-serif;
        margin-top: 10%;
        font-size: 32px;
        width: 80%;
        margin-left: 10%;
    }

    .description {
        width: 80%;
        color: #1e2d50;
        font-size: 28px;
        margin-left: 10%;
    }

    .linkButtons {
        width: 80%;
        margin-left: 10%;
        user-select: none;
    }

    .linkButton {
        width: 35%;
        background-color: #3782A0;
        display: inline-block;
        margin: 5% 5% 5% 5%;
        height: 80px;
        color: #8fa6b5;
        text-decoration: none;
        border-radius: 10px;
        line-height: 80px;
        font-size: 20px;
        cursor: pointer;
        transition: transform 0.5s;
    }

    .linkButton:hover {
        transform: translateY(5px);
    }

    .messagesButton {
        background-color: #cdf0ff;
        color: #1e2d50;
    }

    .routerLink {
        text-decoration: none;
        color: inherit;
        width: 100%;
        height: 100%;
    }
    .openbutton {
        position: absolute;
        top: 9%;
        right: 7%;
        width: 10%;
        border: 3px #2d6880 solid;
        height: 50px;
        background-color: #3B8BAB;
        color: #0B3241;
        text-decoration: none;
        border-radius: 30px;
        line-height: 50px;
        font-size: 20px;
        cursor: pointer;
        transition: transform 0.5s;
    }
    .aboutButton {
        color: #9dbdcc;
        background-color: #145266;
    }
    .openbutton:hover {
        transform: translateY(5px);
    }
</style>
