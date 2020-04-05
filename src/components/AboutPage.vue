<template>
    <div class="aboutPage">
        <h1 class="aboutTitle">Aquifer</h1>
        <div class="infoBoxes">
            <InfoBox
                class="infoBox"
                heading="What is this?"
                data="Aquifer is the new, open source social media. It's a fine place to chat with your friends, talk to strangers, anything really. It's easy for everyone as the chat system is very intuitive and easy to learn, and anyone can make their own server."
            ></InfoBox>
            <InfoBox
                class="infoBox"
                heading="How do I use Aquifer?"
                data="It's easy. Join a server, then click on a channel to join the channel. If you want, you can make your own channel or delete a pre-existing one. Sending messages is as simple as typing in your message and hitting Enter. If you need to edit or delete your message, double click it and a menu will pop up. Working with channels is easy, too. You can hit the new channel button to name and create your channel. If you need to delete a channel, simply double click the channel name."
            ></InfoBox>
            <InfoBox
                class="infoBox"
                heading="How did you come up with the name?"
                data="I wanted something that related to water. Originally, I chose Estuary, due to the fresh and salt water mixing like different ideas mixing, but that was too similar to an existing company, so I decided against it. Eventually, I settled on Aquifer, and that's what it is today."
            ></InfoBox>
            <InfoBox
                class="infoBox"
                heading="Why would I use Aquifer?"
                data="That's an excellent question. To be honest, there's really not much right now that makes it better than any other social media out there - and for good reason. However, if you want to be a part of an innovative new platform, then by all means, use Aquifer!"
            ></InfoBox>
        </div>
    </div>
</template>

<script lang="ts">
    import "../assets/colorVars.css";
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {
            InfoBox: () => import('./AboutPageComponents/InfoBox.vue')
        }
    })
    export default class AboutPage extends Vue {}
</script>

<style scoped lang="scss">
    .infoBoxes {
        display: flex;
        flex-wrap: wrap;
    }
    .infoBox {
        width: 40%;
        margin: 1% 5% 1% 5%;
    }
    .aboutPage {
        background-color: var(--aquifer-light-1);
        height: 100%;
        min-height: calc(100vh);
    }
    .aboutTitle {
        margin: 0;
        padding-top: 5%;
        font-size: 60px;
        font-family: "Candara Light", "Candara", sans-serif;
    }
</style>
