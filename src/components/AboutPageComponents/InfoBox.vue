<template>
    <div class="infoBox">
        <div class="infoBoxHeading">
            <h2>{{ heading }}</h2>
        </div>
        <div class="infoBoxDivider"></div>
        <div class="infoBoxData">
            <p>{{ data }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InfoBox",
        props: {
            heading: String,
            data: String
        },
    }
</script>

<style scoped>
    .infoBoxDivider {
        height: 10px;
        border-radius: 10px;
        background-color: rgba(240, 240, 240, 0.5);
    }
</style>