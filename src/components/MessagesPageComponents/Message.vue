<template>
    <div class="message">
        <p> <span class="message-username">{{user}}</span>  <span class="message-date">{{date}}</span></p>
        <p class="message-content">{{message}}</p>
    </div>
</template>

<script>
export default {
    name: "Message",
    props: {
        user: String,
        date: String,
        message: String
    },
    // data: () => ({
    //     clicks: 0
    // }),
}
</script>

<style scoped>
    .message {
        width: 94%;
        background-color: #459DBF;
        /* height: 50px; */
        text-align: left;
        padding: 10px 3% 10px 3%;
    }
    .message:hover {
        background-color: #3782A0;
    }
    .message-username {
        color: darkred;
        font-size: 20px;
    }
    .message-date {
        font-size: 10px;
        color: #0B3241;
    }
    .message-content {
        color: #ccc;
    }
</style>