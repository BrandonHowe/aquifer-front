(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{237:function(t,e,n){"use strict";n.r(e);n(250),n(180);var r={name:"MsgPopup",props:{user:Object,date:String,message:String,msgId:Number},data:function(){return{clickingMain:!1}},methods:{editMessage:function(){this.$emit("editMessage",this.msgId),this.$emit("closeMsgModal"),this.clickingMain=!1},deleteMessage:function(){this.$emit("deleteMessage",this.msgId),this.$emit("closeMsgModal"),this.clickingMain=!1},closeModal:function(t){!1!==this.clickingMain&&"x"!==t||(this.clickingMain=!1,this.$emit("closeMsgModal"))}}},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"msgpopup",attrs:{id:"msgpopup"},on:{click:function(e){return t.closeModal("reg")}}},[n("div",{staticClass:"msgpopup-content",on:{click:function(e){t.clickingMain=!0}}},[n("span",{staticClass:"close",on:{click:function(e){return t.closeModal("x")}}},[t._v("×")]),t._v(" "),n("div",{staticClass:"msgpopup-header"},[n("p",[n("span",{staticClass:"message-username"},[t._v(t._s(t.user.username)+"#"+t._s(t.user.usernum))]),t._v(" "),n("span",{staticClass:"message-date"},[t._v(t._s(t.date))])]),t._v(" "),n("p",{staticClass:"message-content"},[t._v(t._s(t.message))]),t._v(" "),n("p",[t._v("Message ID: "+t._s(t.msgId))])]),t._v(" "),n("div",{staticClass:"msgpopup-actions"},[n("p",{staticClass:"msgpopup-action",on:{click:t.editMessage}},[t._v("Edit message "),n("i",{staticClass:"cil-energy"})]),t._v(" "),n("p",{staticClass:"msgpopup-action",on:{click:t.deleteMessage}},[t._v("Delete message "),n("i",{staticClass:"cil-energy"})])])])])};o._withStripped=!0;var a=n(12);var s=function(t){n(248)},i=Object(a.a)(r,o,[],!1,s,"data-v-0f8af214",null);i.options.__file="src\\components\\MessagesPageComponents\\MsgPopup.vue";e.default=i.exports},248:function(t,e,n){var r=n(249);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,n(32).default)("7b100bdf",r,!1,{})},249:function(t,e,n){(e=n(19)(!1)).push([t.i,"\n.msgpopup[data-v-0f8af214] {\r\n    /* display: none; */\r\n    /* Hidden by default */\r\n    position: fixed;\r\n    /* Stay in place */\r\n    z-index: 2;\r\n    /* Sit on top */\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    /* Full width */\r\n    height: 100vh;\r\n    /* Full height */\r\n    overflow: auto;\r\n    /* Enable scroll if needed */\r\n    background-color: rgb(0,0,0);\r\n    /* Fallback color */\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    text-align: left;\r\n    color: var(--aquifer-text-dark-2);\r\n    /* Black w/ opacity */\n}\n.msgpopup-content[data-v-0f8af214] {\r\n    background-color: var(--aquifer-medium-4);\r\n    margin: 10% auto;\r\n    /* 15% from the top and centered */\r\n    height: 60%;\r\n    padding: 20px;\r\n    border: 1px solid #264F5F;\r\n    width: 80%;\r\n    /* Could be more or less, depending on screen size */\n}\n.close[data-v-0f8af214] {\r\n    color: var(--aquifer-text-dark-2);\r\n    float: right;\r\n    font-size: 28px;\r\n    font-weight: bold;\n}\n.close[data-v-0f8af214]:hover,\r\n.close[data-v-0f8af214]:focus {\r\n    color: black;\r\n    text-decoration: none;\r\n    cursor: pointer;\n}\n.message-username[data-v-0f8af214] {\r\n    color: darkred;\r\n    font-size: 20px;\n}\n.message-date[data-v-0f8af214] {\r\n    font-size: 10px;\r\n    color: var(--aquifer-text-dark-2);\n}\n.message-content[data-v-0f8af214] {\r\n    color: azure;\n}\n.msgpopup-action[data-v-0f8af214]:hover {\r\n    background-color: var(--aquifer-light-3);\r\n    margin: -10px;\r\n    padding: 10px;\n}\r\n",""]),t.exports=e},250:function(t,e,n){"use strict";var r=n(5),o=n(1),a=n(185),s=n(22),i=n(3),c=n(7),p=n(251),l=n(21),u=n(2),f=n(254),d=n(183).f,g=n(33).f,v=n(20).f,m=n(257).trim,h=o.Number,_=h.prototype,b="Number"==c(f(_)),x=function(t){var e,n,r,o,a,s,i,c,p=l(t,!1);if("string"==typeof p&&p.length>2)if(43===(e=(p=m(p)).charCodeAt(0))||45===e){if(88===(n=p.charCodeAt(2))||120===n)return NaN}else if(48===e){switch(p.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+p}for(s=(a=p.slice(2)).length,i=0;i<s;i++)if((c=a.charCodeAt(i))<48||c>o)return NaN;return parseInt(a,r)}return+p};if(a("Number",!h(" 0o1")||!h("0b1")||h("+0x1"))){for(var M,k=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof k&&(b?u((function(){_.valueOf.call(n)})):"Number"!=c(n))?p(new h(x(e)),n,k):x(e)},y=r?d(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;y.length>I;I++)i(h,M=y[I])&&!i(k,M)&&v(k,M,g(h,M));k.prototype=_,_.constructor=k,s(o,"Number",k)}},251:function(t,e,n){var r=n(6),o=n(252);t.exports=function(t,e,n){var a,s;return o&&"function"==typeof(a=e.constructor)&&a!==n&&r(s=a.prototype)&&s!==n.prototype&&o(t,s),t}},252:function(t,e,n){var r=n(13),o=n(253);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,a){return r(n),o(a),e?t.call(n,a):n.__proto__=a,n}}():void 0)},253:function(t,e,n){var r=n(6);t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},254:function(t,e,n){var r,o=n(13),a=n(255),s=n(181),i=n(35),c=n(186),p=n(34),l=n(182),u=l("IE_PROTO"),f=function(){},d=function(t){return"<script>"+t+"<\/script>"},g=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;g=r?function(t){t.write(d("")),t.close();var e=t.parentWindow.Object;return t=null,e}(r):((e=p("iframe")).style.display="none",c.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(d("document.F=Object")),t.close(),t.F);for(var n=s.length;n--;)delete g.prototype[s[n]];return g()};i[u]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(f.prototype=o(t),n=new f,f.prototype=null,n[u]=t):n=g(),void 0===e?n:a(n,e)}},255:function(t,e,n){var r=n(5),o=n(20),a=n(13),s=n(256);t.exports=r?Object.defineProperties:function(t,e){a(t);for(var n,r=s(e),i=r.length,c=0;i>c;)o.f(t,n=r[c++],e[n]);return t}},256:function(t,e,n){var r=n(184),o=n(181);t.exports=Object.keys||function(t){return r(t,o)}},257:function(t,e,n){var r=n(14),o="["+n(258)+"]",a=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),i=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(a,"")),2&t&&(n=n.replace(s,"")),n}};t.exports={start:i(1),end:i(2),trim:i(3)}},258:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"}}]);