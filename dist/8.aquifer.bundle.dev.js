(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/MessagesPageComponents/MsgPopup.vue":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/MessagesPageComponents/MsgPopup.vue ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _coreui_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @coreui/icons */ \"./node_modules/@coreui/icons/js/index.js\");\n/* harmony import */ var _assets_colorVars_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/colorVars.css */ \"./src/assets/colorVars.css\");\n/* harmony import */ var _assets_colorVars_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_colorVars_css__WEBPACK_IMPORTED_MODULE_2__);\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"MsgPopup\",\n  props: {\n    user: Object,\n    date: String,\n    message: String,\n    msgId: Number\n  },\n  data: function data() {\n    return {\n      clickingMain: false\n    };\n  },\n  methods: {\n    editMessage: function editMessage() {\n      this.$emit(\"editMessage\", this.msgId);\n      this.$emit(\"closeMsgModal\");\n      this.clickingMain = false;\n    },\n    deleteMessage: function deleteMessage() {\n      this.$emit(\"deleteMessage\", this.msgId);\n      this.$emit(\"closeMsgModal\");\n      this.clickingMain = false;\n    },\n    closeModal: function closeModal(type) {\n      if (this.clickingMain === false || type === \"x\") {\n        this.clickingMain = false;\n        this.$emit(\"closeMsgModal\");\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/MessagesPageComponents/MsgPopup.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-0f8af214\",\"scoped\":true,\"sourceMap\":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/MessagesPageComponents/MsgPopup.vue":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-0f8af214","scoped":true,"sourceMap":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/MessagesPageComponents/MsgPopup.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n.msgpopup[data-v-0f8af214] {\\r\\n    /* display: none; */\\r\\n    /* Hidden by default */\\r\\n    position: fixed;\\r\\n    /* Stay in place */\\r\\n    z-index: 2;\\r\\n    /* Sit on top */\\r\\n    left: 0;\\r\\n    top: 0;\\r\\n    width: 100%;\\r\\n    /* Full width */\\r\\n    height: 100vh;\\r\\n    /* Full height */\\r\\n    overflow: auto;\\r\\n    /* Enable scroll if needed */\\r\\n    background-color: rgb(0,0,0);\\r\\n    /* Fallback color */\\r\\n    background-color: rgba(0, 0, 0, 0.7);\\r\\n    text-align: left;\\r\\n    color: var(--aquifer-text-dark-2);\\r\\n    /* Black w/ opacity */\\n}\\n.msgpopup-content[data-v-0f8af214] {\\r\\n    background-color: var(--aquifer-medium-4);\\r\\n    margin: 10% auto;\\r\\n    /* 15% from the top and centered */\\r\\n    height: 60%;\\r\\n    padding: 20px;\\r\\n    border: 1px solid #264F5F;\\r\\n    width: 80%;\\r\\n    /* Could be more or less, depending on screen size */\\n}\\n.close[data-v-0f8af214] {\\r\\n    color: var(--aquifer-text-dark-2);\\r\\n    float: right;\\r\\n    font-size: 28px;\\r\\n    font-weight: bold;\\n}\\n.close[data-v-0f8af214]:hover,\\r\\n.close[data-v-0f8af214]:focus {\\r\\n    color: black;\\r\\n    text-decoration: none;\\r\\n    cursor: pointer;\\n}\\n.message-username[data-v-0f8af214] {\\r\\n    color: darkred;\\r\\n    font-size: 20px;\\n}\\n.message-date[data-v-0f8af214] {\\r\\n    font-size: 10px;\\r\\n    color: var(--aquifer-text-dark-2);\\n}\\n.message-content[data-v-0f8af214] {\\r\\n    color: azure;\\n}\\n.msgpopup-action[data-v-0f8af214]:hover {\\r\\n    background-color: var(--aquifer-light-3);\\r\\n    margin: -10px;\\r\\n    padding: 10px;\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/MessagesPageComponents/MsgPopup.vue?./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/style-compiler?%7B%22optionsId%22:%220%22,%22vue%22:true,%22id%22:%22data-v-0f8af214%22,%22scoped%22:true,%22sourceMap%22:false%7D!./node_modules/vue-loader/lib/selector.js?type=styles&index=0");

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0f8af214\",\"hasScoped\":true,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/MessagesPageComponents/MsgPopup.vue":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0f8af214","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/MessagesPageComponents/MsgPopup.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      staticClass: \"msgpopup\",\n      attrs: { id: \"msgpopup\" },\n      on: {\n        click: function($event) {\n          return _vm.closeModal(\"reg\")\n        }\n      }\n    },\n    [\n      _c(\n        \"div\",\n        {\n          staticClass: \"msgpopup-content\",\n          on: {\n            click: function($event) {\n              _vm.clickingMain = true\n            }\n          }\n        },\n        [\n          _c(\n            \"span\",\n            {\n              staticClass: \"close\",\n              on: {\n                click: function($event) {\n                  return _vm.closeModal(\"x\")\n                }\n              }\n            },\n            [_vm._v(\"×\")]\n          ),\n          _vm._v(\" \"),\n          _c(\"div\", { staticClass: \"msgpopup-header\" }, [\n            _c(\"p\", [\n              _c(\"span\", { staticClass: \"message-username\" }, [\n                _vm._v(\n                  _vm._s(_vm.user.username) + \"#\" + _vm._s(_vm.user.usernum)\n                )\n              ]),\n              _vm._v(\" \"),\n              _c(\"span\", { staticClass: \"message-date\" }, [\n                _vm._v(_vm._s(_vm.date))\n              ])\n            ]),\n            _vm._v(\" \"),\n            _c(\"p\", { staticClass: \"message-content\" }, [\n              _vm._v(_vm._s(_vm.message))\n            ]),\n            _vm._v(\" \"),\n            _c(\"p\", [_vm._v(\"Message ID: \" + _vm._s(_vm.msgId))])\n          ]),\n          _vm._v(\" \"),\n          _c(\"div\", { staticClass: \"msgpopup-actions\" }, [\n            _c(\n              \"p\",\n              {\n                staticClass: \"msgpopup-action\",\n                on: { click: _vm.editMessage }\n              },\n              [_vm._v(\"Edit message \"), _c(\"i\", { staticClass: \"cil-energy\" })]\n            ),\n            _vm._v(\" \"),\n            _c(\n              \"p\",\n              {\n                staticClass: \"msgpopup-action\",\n                on: { click: _vm.deleteMessage }\n              },\n              [\n                _vm._v(\"Delete message \"),\n                _c(\"i\", { staticClass: \"cil-energy\" })\n              ]\n            )\n          ])\n        ]\n      )\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\nif (false) {}\n\n//# sourceURL=webpack:///./src/components/MessagesPageComponents/MsgPopup.vue?./node_modules/vue-loader/lib/template-compiler?%7B%22id%22:%22data-v-0f8af214%22,%22hasScoped%22:true,%22optionsId%22:%220%22,%22buble%22:%7B%22transforms%22:%7B%7D%7D%7D!./node_modules/vue-loader/lib/selector.js?type=template&index=0");

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