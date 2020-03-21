<template>
    <div class="server">
        <span
            class="serverText"
        >
            {{name.charAt(0)}}
        </span>
        <div
            class="restOfIt"
        >
            {{name}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Server",
        props: {
            name: String
        },
        data() {
            return {
                expanded: false,
                restOfDaName: this.name.substring(1)
            }
        },
        methods: {
            changeExpanded(arg, delay) {
                const self = this;
                setTimeout(() => {
                    self.expanded = arg
                }, delay);
            },
        },
        computed: {
            currentName() {
                return this.expanded === true ? this.name : this.name.charAt(0);
            }
        }
    }
</script>

<style scoped>
    .server {
        width: 80%;
        border-radius: 1000px;
        /*background-color: #459DBF;*/
        padding-top: 40%;
        padding-bottom: 40%;
        margin: 10%;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        transition: width 0.5s, background-color 0.3s;
    }

    .server:hover {
        /*background-color: #67AFCB;*/
    }

    .serverText {
        margin: 0;
        position: absolute;
        top: 20%;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 2.5vw;
        line-height: calc(100%);
        user-select: none;
        border-radius: 1000px;
        z-index: 1;
    }

    .restOfIt {
        margin: 0;
        position: absolute;
        top: 10%;
        left: 4.5vw;
        right: 0;
        bottom: 0;
        font-size: 2vw;
        line-height: 100%;
        user-select: none;
        border-radius: 1000px;
        z-index: 1;
        display: none;
        background-color: #0B3241;
        color: #78A4B5;
        width: max-content;
        padding: 10px;
        opacity: 0;
        transition: opacity 0.5s;
    }

    .server:hover .restOfIt {
        display: block;
        opacity: 1;
    }
    .restOfIt::after {
        content: "";
        position: absolute;
        top: calc(50% - 5px);
        right: calc(100% - 5px);
        margin-top: -5px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent #0B3241 transparent transparent;
    }
</style>
