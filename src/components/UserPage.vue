<template>
    <div class="userPage">
        <div class="userNameDiv">
            <h1 class="userName">{{ user }}</h1>
            <div class="userUnderline"></div>
        </div>
    </div>
</template>

<script>
    import "../assets/colorVars.css";
    export default {
        name: "UserPage",
        props: {
            user: String,
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
</style>