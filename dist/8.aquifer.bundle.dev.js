(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/MessagesPageComponents/MsgPopup.vue":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/MessagesPageComponents/MsgPopup.vue ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Brandon_Documents_Projects_aquifer_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _coreui_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @coreui/icons */ \"./node_modules/@coreui/icons/js/index.js\");\n/* harmony import */ var _assets_colorVars_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/colorVars.css */ \"./src/assets/colorVars.css\");\n/* harmony import */ var _assets_colorVars_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_colorVars_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _assets_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/config */ \"./src/assets/config.js\");\n/* harmony import */ var xhr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! xhr */ \"./node_modules/xhr/index.js\");\n/* harmony import */ var xhr__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(xhr__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"MsgPopup\",\n  props: {\n    user: Object,\n    date: Number,\n    message: String,\n    msgId: Number\n  },\n  data: function data() {\n    return {\n      clickingMain: false,\n      modifiable: false\n    };\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    return Object(C_Users_Brandon_Documents_Projects_aquifer_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return _this.checkModifiable();\n\n            case 2:\n              _this.modifiable = _context.sent;\n\n            case 3:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }))();\n  },\n  methods: {\n    checkPower: function checkPower(username, usernum) {\n      return new Promise(function (resolve) {\n        xhr__WEBPACK_IMPORTED_MODULE_7___default()({\n          method: \"get\",\n          uri: _assets_config__WEBPACK_IMPORTED_MODULE_6__[\"config\"].serverUrl + \"/userPower/\" + username + \"/\" + usernum,\n          useXDR: true,\n          headers: {\n            \"Content-Type\": \"application/json\",\n            \"Access-Control-Allow-Origin\": \"*\"\n          }\n        }, function (err, resp, body) {\n          if (err) throw err;\n\n          if (resp.statusCode !== 200) {\n            console.log(resp.statusCode);\n          }\n\n          console.log(\"Body: \".concat(body));\n          resolve(body);\n        });\n      });\n    },\n    checkModifiable: function checkModifiable() {\n      var _this2 = this;\n\n      return Object(C_Users_Brandon_Documents_Projects_aquifer_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n        var username, usernum, power, powerMatches;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                username = localStorage.getItem(\"username\");\n                usernum = Number(localStorage.getItem(\"usernum\"));\n\n                if (!(_this2.user.username === username && _this2.user.usernum === usernum)) {\n                  _context2.next = 6;\n                  break;\n                }\n\n                return _context2.abrupt(\"return\", true);\n\n              case 6:\n                _context2.next = 8;\n                return _this2.checkPower(username, usernum);\n\n              case 8:\n                power = _context2.sent;\n                powerMatches = power === \"admin\";\n                console.log(powerMatches);\n                return _context2.abrupt(\"return\", powerMatches);\n\n              case 12:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2);\n      }))();\n    },\n    editMessage: function editMessage() {\n      console.log(\"editing \".concat(this.msgId));\n      this.$emit(\"editMessage\", this.msgId);\n      this.$emit(\"closeMsgModal\");\n      this.clickingMain = false;\n    },\n    deleteMessage: function deleteMessage() {\n      this.$emit(\"deleteMessage\", this.msgId);\n      this.$emit(\"closeMsgModal\");\n      this.clickingMain = false;\n    },\n    closeModal: function closeModal(type) {\n      if (this.clickingMain === false || type === \"x\") {\n        this.clickingMain = false;\n        this.$emit(\"closeMsgModal\");\n      }\n    }\n  },\n  computed: {\n    formattedDate: function formattedDate() {\n      return moment__WEBPACK_IMPORTED_MODULE_8___default()(this.date).calendar();\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/MessagesPageComponents/MsgPopup.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-0f8af214\",\"scoped\":true,\"sourceMap\":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/MessagesPageComponents/MsgPopup.vue":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-0f8af214","scoped":true,"sourceMap":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/MessagesPageComponents/MsgPopup.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n.msgpopup[data-v-0f8af214] {\\n    /* display: none; */\\n    /* Hidden by default */\\n    position: fixed;\\n    /* Stay in place */\\n    z-index: 2;\\n    /* Sit on top */\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    /* Full width */\\n    height: 100vh;\\n    /* Full height */\\n    overflow: auto;\\n    /* Enable scroll if needed */\\n    background-color: rgb(0, 0, 0);\\n    /* Fallback color */\\n    background-color: rgba(0, 0, 0, 0.7);\\n    text-align: left;\\n    color: var(--aquifer-text-dark-2);\\n    /* Black w/ opacity */\\n}\\n.msgpopup-content[data-v-0f8af214] {\\n    background-color: var(--aquifer-medium-4);\\n    margin: 12% auto;\\n    /* 15% from the top and centered */\\n    height: 40%;\\n    padding: 20px;\\n    border: var(--aquifer-light-1) 5px solid;\\n    border-radius: 10px;\\n    width: 80%;\\n    /* Could be more or less, depending on screen size */\\n}\\n.close[data-v-0f8af214] {\\n    color: var(--aquifer-text-dark-2);\\n    float: right;\\n    font-size: 28px;\\n    font-weight: bold;\\n}\\n.close[data-v-0f8af214]:hover,\\n.close[data-v-0f8af214]:focus {\\n    color: black;\\n    text-decoration: none;\\n    cursor: pointer;\\n}\\n.message-username[data-v-0f8af214] {\\n    color: darkred;\\n    font-size: 20px;\\n}\\n.message-date[data-v-0f8af214] {\\n    font-size: 10px;\\n    color: var(--aquifer-text-dark-2);\\n}\\n.message-content[data-v-0f8af214] {\\n    color: azure;\\n}\\n.msgpopup-action[data-v-0f8af214]:hover {\\n    background-color: var(--aquifer-light-3);\\n    margin: -10px;\\n    padding: 10px;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/MessagesPageComponents/MsgPopup.vue?./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler?%7B%22optionsId%22:%220%22,%22vue%22:true,%22id%22:%22data-v-0f8af214%22,%22scoped%22:true,%22sourceMap%22:false%7D!./node_modules/vue-loader/lib/selector.js?type=styles&index=0");

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0f8af214\",\"hasScoped\":true,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/MessagesPageComponents/MsgPopup.vue":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0f8af214","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/MessagesPageComponents/MsgPopup.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      staticClass: \"msgpopup\",\n      attrs: { id: \"msgpopup\" },\n      on: {\n        click: function($event) {\n          return _vm.closeModal(\"reg\")\n        }\n      }\n    },\n    [\n      _c(\n        \"div\",\n        {\n          staticClass: \"msgpopup-content\",\n          on: {\n            click: function($event) {\n              _vm.clickingMain = true\n            }\n          }\n        },\n        [\n          _c(\n            \"span\",\n            {\n              staticClass: \"close\",\n              on: {\n                click: function($event) {\n                  return _vm.closeModal(\"x\")\n                }\n              }\n            },\n            [_vm._v(\"×\")]\n          ),\n          _vm._v(\" \"),\n          _c(\"div\", { staticClass: \"msgpopup-header\" }, [\n            _c(\"p\", [\n              _c(\"span\", { staticClass: \"message-username\" }, [\n                _vm._v(\n                  _vm._s(_vm.user.username) + \"#\" + _vm._s(_vm.user.usernum)\n                )\n              ]),\n              _vm._v(\" \"),\n              _c(\"span\", { staticClass: \"message-date\" }, [\n                _vm._v(_vm._s(_vm.formattedDate))\n              ])\n            ]),\n            _vm._v(\" \"),\n            _c(\"p\", { staticClass: \"message-content\" }, [\n              _vm._v(_vm._s(_vm.message))\n            ]),\n            _vm._v(\" \"),\n            _c(\"p\", [_vm._v(\"Message ID: \" + _vm._s(_vm.msgId))])\n          ]),\n          _vm._v(\" \"),\n          _c(\"div\", { staticClass: \"msgpopup-actions\" }, [\n            _vm.modifiable\n              ? _c(\n                  \"p\",\n                  {\n                    staticClass: \"msgpopup-action\",\n                    on: { click: _vm.editMessage }\n                  },\n                  [\n                    _vm._v(\"Edit message \"),\n                    _c(\"i\", { staticClass: \"cil-energy\" })\n                  ]\n                )\n              : _vm._e(),\n            _vm._v(\" \"),\n            _vm.modifiable\n              ? _c(\n                  \"p\",\n                  {\n                    staticClass: \"msgpopup-action\",\n                    on: { click: _vm.deleteMessage }\n                  },\n                  [\n                    _vm._v(\"Delete message \"),\n                    _c(\"i\", { staticClass: \"cil-energy\" })\n                  ]\n                )\n              : _vm._e()\n          ])\n        ]\n      )\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\nif (false) {}\n\n//# sourceURL=webpack:///./src/components/MessagesPageComponents/MsgPopup.vue?./node_modules/vue-loader/lib/template-compiler?%7B%22id%22:%22data-v-0f8af214%22,%22hasScoped%22:true,%22optionsId%22:%220%22,%22buble%22:%7B%22transforms%22:%7B%7D%7D%7D!./node_modules/vue-loader/lib/selector.js?type=template&index=0");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-0f8af214\",\"scoped\":true,\"sourceMap\":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/MessagesPageComponents/MsgPopup.vue":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-0f8af214","scoped":true,"sourceMap":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/MessagesPageComponents/MsgPopup.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/style-compiler?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-0f8af214\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MsgPopup.vue */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\\\"optionsId\\\":\\\"0\\\",\\\"vue\\\":true,\\\"id\\\":\\\"data-v-0f8af214\\\",\\\"scoped\\\":true,\\\"sourceMap\\\":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/MessagesPageComponents/MsgPopup.vue\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"7b100bdf\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/MessagesPageComponents/MsgPopup.vue?./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler?%7B%22optionsId%22:%220%22,%22vue%22:true,%22id%22:%22data-v-0f8af214%22,%22scoped%22:true,%22sourceMap%22:false%7D!./node_modules/vue-loader/lib/selector.js?type=styles&index=0");

/***/ }),

/***/ "./src/components/MessagesPageComponents/MsgPopup.vue":
/*!************************************************************!*\
  !*** ./src/components/MessagesPageComponents/MsgPopup.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MsgPopup_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !babel-loader!../../../node_modules/vue-loader/lib/selector?type=script&index=0!./MsgPopup.vue */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/MessagesPageComponents/MsgPopup.vue\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_0f8af214_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MsgPopup_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/template-compiler/index?{\"id\":\"data-v-0f8af214\",\"hasScoped\":true,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!../../../node_modules/vue-loader/lib/selector?type=template&index=0!./MsgPopup.vue */ \"./node_modules/vue-loader/lib/template-compiler/index.js?{\\\"id\\\":\\\"data-v-0f8af214\\\",\\\"hasScoped\\\":true,\\\"optionsId\\\":\\\"0\\\",\\\"buble\\\":{\\\"transforms\\\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/MessagesPageComponents/MsgPopup.vue\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/component-normalizer */ \"./node_modules/vue-loader/lib/runtime/component-normalizer.js\");\nvar disposed = false\nfunction injectStyle (context) {\n  if (disposed) return\n  __webpack_require__(/*! !vue-style-loader!css-loader!../../../node_modules/vue-loader/lib/style-compiler/index?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-0f8af214\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector?type=styles&index=0!./MsgPopup.vue */ \"./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\\\"optionsId\\\":\\\"0\\\",\\\"vue\\\":true,\\\"id\\\":\\\"data-v-0f8af214\\\",\\\"scoped\\\":true,\\\"sourceMap\\\":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/MessagesPageComponents/MsgPopup.vue\")\n}\n/* script */\n\n\n/* template */\n\n/* template functional */\nvar __vue_template_functional__ = false\n/* styles */\nvar __vue_styles__ = injectStyle\n/* scopeId */\nvar __vue_scopeId__ = \"data-v-0f8af214\"\n/* moduleIdentifier (server only) */\nvar __vue_module_identifier__ = null\n\nvar Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MsgPopup_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_0f8af214_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MsgPopup_vue__WEBPACK_IMPORTED_MODULE_1__[\"render\"],\n  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_0f8af214_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MsgPopup_vue__WEBPACK_IMPORTED_MODULE_1__[\"staticRenderFns\"],\n  __vue_template_functional__,\n  __vue_styles__,\n  __vue_scopeId__,\n  __vue_module_identifier__\n)\nComponent.options.__file = \"src\\\\components\\\\MessagesPageComponents\\\\MsgPopup.vue\"\n\n/* hot reload */\nif (false) {}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Component.exports);\n\n\n//# sourceURL=webpack:///./src/components/MessagesPageComponents/MsgPopup.vue?");

/***/ })

}]);