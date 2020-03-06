<template>
    <div class="message">
        <p> <span class="message-username">{{user.username}}</span>  <span class="message-date">{{date}}</span></p>
        <p class="message-content">{{message}}</p>
    </div>
</template>

<script>
    import '../../assets/colorVars.css';
export default {
    name: "Message",
    props: {
        user: Object,
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
        background-color: var(--aquifer-medium-2);
        /* height: 50px; */
        text-align: left;
        padding: 10px 3% 10px 3%;
    }
    .message:hover {
        background-color: var(--aquifer-dark-1);
    }
    .message-username {
        color: darkred;
        font-size: 20px;
    }
    .message-date {
        font-size: 10px;
        color: var(--aquifer-text-dark-2);
    }
    .message-content {
        color: #ccc;
    }
</style>