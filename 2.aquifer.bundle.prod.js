(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{269:function(e,n,t){"use strict";t.r(n);t(32),t(48);var r=t(7),a=(t(300),{name:"Server",props:{name:String},data:function(){return{expanded:!1,restOfDaName:this.name.substring(1)}},methods:{changeExpanded:function(e,n){var t=this;setTimeout((function(){t.expanded=e}),n)}},computed:{currentName:function(){return!0===this.expanded?this.name:this.name.charAt(0)}}}),i=function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"server"},[n("span",{staticClass:"serverText"},[this._v("\n        "+this._s(this.name.charAt(0))+"\n    ")]),this._v(" "),n("div",{staticClass:"restOfIt"},[this._v("\n        "+this._s(this.name)+"\n    ")])])};i._withStripped=!0;var o=t(1);var s=function(e){t(298)},c=Object(o.a)(a,i,[],!1,s,"data-v-7ae9394e",null);c.options.__file="src\\components\\MessagesPageComponents\\Server.vue";var d=c.exports,u=t(5),l=t.n(u),v=t(4),f={name:"ServerList",components:{Server:d},props:{servers:Object,user:Object},data:function(){return{currentlySelected:1,clicks:{num:0,server:0},userPower:""}},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.checkPower(e.user.username,e.user.userNum);case 2:e.userPower=n.sent;case 3:case"end":return n.stop()}}),n)})))()},methods:{checkPower:function(e,n){return new Promise((function(t){l()({method:"get",uri:v.a.serverUrl+"/userPower/"+e+"/"+n,useXDR:!0,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}},(function(e,n,r){if(e)throw e;200!==n.statusCode&&console.log(n.statusCode),t(r)}))}))},changeServer:function(e){this.currentlySelected=e,this.$emit("changedServer",e)},oneClick:function(e){if(this.changeServer(e),this.clicks.num++,1===this.clicks.num){var n=this;this.clicks.server=e,this.timer=setTimeout((function(){n.clicks.num=0}),700)}else if(e===this.clicks.server){clearTimeout(this.timer);var t=this.servers[this.currentlySelected];this.$emit("openServerModal",t),this.clicks.num=0}},newServer:function(){this.$emit("openNewServerModal")}}},p=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"serverList"},[e._l(e.servers,(function(n){return t("Server",{key:n.id,staticClass:"channelHover",class:{coloredBackground:n.id===e.currentlySelected},attrs:{name:n.name},nativeOn:{click:function(t){return e.oneClick(n.id)}}})})),e._v(" "),"admin"===e.userPower?t("div",{staticClass:"addServer",on:{click:e.newServer}},[t("p",{staticClass:"addServerText"},[e._v("+")])]):e._e()],2)};p._withStripped=!0;var h=function(e){t(296)},m=Object(o.a)(f,p,[],!1,h,"data-v-ffbaf7e8",null);m.options.__file="src\\components\\MessagesPageComponents\\ServerList.vue";n.default=m.exports},296:function(e,n,t){var r=t(297);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,t(9).default)("beb861d8",r,!1,{})},297:function(e,n,t){(n=t(8)(!1)).push([e.i,"\n.serverList[data-v-ffbaf7e8] {\n    grid-column: 1;\n    grid-row: 1 / 21;\n    /* background-color: #044289; */\n    background-color: var(--aquifer-dark-2);\n}\n.addServer[data-v-ffbaf7e8] {\n    width: 80%;\n    border-radius: 1000px;\n    /*background-color: #459DBF;*/\n    padding-top: 40%;\n    padding-bottom: 40%;\n    margin: 10%;\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    background-color: var(--aquifer-medium-3);\n    transition: width 0.5s, background-color 0.3s;\n}\n.addServer[data-v-ffbaf7e8]:hover {\n    background-color: var(--aquifer-medium-2);\n}\n.addServerText[data-v-ffbaf7e8] {\n    margin: 0;\n    position: absolute;\n    top: 20%;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    font-size: 2.5vw;\n    line-height: calc(100%);\n    user-select: none;\n    border-radius: 1000px;\n    z-index: 1;\n}\n.channelHover[data-v-ffbaf7e8] {\n    background-color: var(--aquifer-medium-3);\n    transition: background-color 0.1s;\n}\n.channelHover[data-v-ffbaf7e8]:hover {\n    background-color: var(--aquifer-medium-2);\n}\n.coloredBackground[data-v-ffbaf7e8] {\n    background-color: var(--aquifer-medium-1);\n}\n",""]),e.exports=n},298:function(e,n,t){var r=t(299);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,t(9).default)("5f537ab4",r,!1,{})},299:function(e,n,t){(n=t(8)(!1)).push([e.i,'\n.server[data-v-7ae9394e] {\n    width: 80%;\n    border-radius: 1000px;\n    /*background-color: #459DBF;*/\n    padding-top: 40%;\n    padding-bottom: 40%;\n    margin: 10%;\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    transition: width 0.5s, background-color 0.3s;\n}\n.server[data-v-7ae9394e]:hover {\n    /*background-color: #67AFCB;*/\n}\n.serverText[data-v-7ae9394e] {\n    margin: 0;\n    position: absolute;\n    top: 20%;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    font-size: 2.5vw;\n    line-height: calc(100%);\n    user-select: none;\n    border-radius: 1000px;\n    z-index: 1;\n}\n.restOfIt[data-v-7ae9394e] {\n    margin: 0;\n    position: absolute;\n    top: 10%;\n    left: 4.5vw;\n    right: 0;\n    bottom: 0;\n    font-size: 2vw;\n    line-height: 100%;\n    user-select: none;\n    border-radius: 1000px;\n    z-index: 1;\n    display: none;\n    background-color: #0B3241;\n    color: #78A4B5;\n    width: max-content;\n    padding: 10px;\n    opacity: 0;\n    transition: opacity 0.5s;\n}\n.server:hover > .restOfIt[data-v-7ae9394e] {\n    display: block;\n    opacity: 1;\n}\n.restOfIt[data-v-7ae9394e]::after {\n    content: "";\n    position: absolute;\n    top: calc(50% - 5px);\n    right: calc(100% - 5px);\n    margin-top: -5px;\n    border-width: 10px;\n    border-style: solid;\n    border-color: transparent #0B3241 transparent transparent;\n}\n',""]),e.exports=n},300:function(e,n,t){var r=t(11),a=t(15).f,i=Function.prototype,o=i.toString,s=/^\s*function ([^ (]*)/;!r||"name"in i||a(i,"name",{configurable:!0,get:function(){try{return o.call(this).match(s)[1]}catch(e){return""}}})}}]);