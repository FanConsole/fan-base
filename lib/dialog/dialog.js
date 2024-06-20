var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_dialog_sfc = require("./dialog-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_button = __toESM(require("../button/button.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Dialog")[0],
  components: { FanButton: import_button.default },
  emits: ["update:show", "confirm", "cancel"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    message: String,
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    cancelColor: {
      type: String,
      default: "#84878F"
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    confirmColor: {
      type: String,
      default: "#F7931E"
    },
    callback: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(props, { emit }) {
    const innerShow = (0, import_vue.ref)(props.show);
    (0, import_vue.watch)(
      () => props.show,
      (val) => {
        if (props.message || props.title)
          innerShow.value = val;
      }
    );
    (0, import_vue.watch)(innerShow, (val) => emit("update:show", val));
    const getActionHandler = (action) => {
      var _a;
      emit(action);
      innerShow.value = false;
      (_a = props.callback) == null ? void 0 : _a.call(props, action);
    };
    const onCancel = () => getActionHandler("cancel");
    const onConfirm = () => getActionHandler("confirm");
    return { innerShow, onCancel, onConfirm };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "fan-dialog__o"
};
const _hoisted_2 = { class: "fan-dialog" };
const _hoisted_3 = { class: "fan-dialog__inner" };
const _hoisted_4 = {
  key: 0,
  class: "fan-dialog__t"
};
const _hoisted_5 = { class: "fan-flex fan-hairline--top" };
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(import_vue2.Transition, { name: "fan" }, {
    default: (0, import_vue2.withCtx)(() => [
      _ctx.innerShow ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
        (0, import_vue2.createElementVNode)("div", _hoisted_2, [
          (0, import_vue2.createElementVNode)("div", _hoisted_3, [
            _ctx.title ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
              "div",
              _hoisted_4,
              (0, import_vue2.toDisplayString)(_ctx.title),
              1
              /* TEXT */
            )) : (0, import_vue2.createCommentVNode)("v-if", true),
            (0, import_vue2.createElementVNode)(
              "div",
              {
                class: (0, import_vue2.normalizeClass)(["fan-dialog__c", { "fan-dialog__his_title": !_ctx.title }])
              },
              (0, import_vue2.toDisplayString)(_ctx.message),
              3
              /* TEXT, CLASS */
            )
          ]),
          (0, import_vue2.createElementVNode)("div", _hoisted_5, [
            _ctx.showCancel ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
              "div",
              {
                key: 0,
                class: "fan-dialog__btn fan-flex-center fan-hairline--right fan-dialog__cancel",
                style: (0, import_vue2.normalizeStyle)({ "--dialog-cancel": _ctx.cancelColor }),
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCancel && _ctx.onCancel(...args))
              },
              (0, import_vue2.toDisplayString)(_ctx.cancelText),
              5
              /* TEXT, STYLE */
            )) : (0, import_vue2.createCommentVNode)("v-if", true),
            (0, import_vue2.createElementVNode)(
              "div",
              {
                class: "fan-dialog__btn fan-flex-center",
                style: (0, import_vue2.normalizeStyle)({ "--dialog-confirm": _ctx.confirmColor }),
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onConfirm && _ctx.onConfirm(...args))
              },
              (0, import_vue2.toDisplayString)(_ctx.confirmText),
              5
              /* TEXT, STYLE */
            )
          ])
        ])
      ])) : (0, import_vue2.createCommentVNode)("v-if", true)
    ]),
    _: 1
    /* STABLE */
  });
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
