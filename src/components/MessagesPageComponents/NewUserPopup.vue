<template>
    <div class="newUserPopup" @click="closeModal('reg')">
        <div class="newUserPopup-content" @click="clickingMain = true">
            <span class="close" @click="closeModal('x')">&times;</span>
            <h3 class="text">
                Welcome to Aquifer! Glad to see that creating an account went okay. There is one thing to remember, though, which is just as important as your username. It's your user number, and you can't log in without it. Because there's no email verification, this was used as an alternative. Your user number is <strong>{{ usernum }}</strong>. If you don't remember it, just look in the bottom left corner of the screen, where it shows your username and number.
            </h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewUserPopup",
        props: {
            usernum: String,
        },
        data() {
            return {
                clickingMain: false
            }
        },
        methods: {
            closeModal(type) {
                if (this.clickingMain === false || type === "x") {
                    this.clickingMain = false;
                    this.$emit("closeModal");
                }
            }
        }
    }
</script>

<style scoped>
    .newUserPopup {
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
        color: #0B3241;
        /* Black w/ opacity */
    }
    .newUserPopup-content {
        background-color: var(--aquifer-medium-4);
        margin: 10% auto;
        /* 15% from the top and centered */
        height: 40%;
        padding: 20px;
        border: var(--aquifer-light-1) 5px solid;
        border-radius: 10px;
        width: 80%;
        /* Could be more or less, depending on screen size */
    }
    .text {
        font-family: Arial, sans-serif;
        font-weight: normal;
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
</style>
