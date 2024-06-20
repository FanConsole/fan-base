import "./dialog-sfc.css";
import { defineComponent, ref, watch } from "vue";
import { createNamespace } from "../utils";
import FanButton from "../button/button.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Dialog")[0],
  components: { FanButton },
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
    const innerShow = ref(props.show);
    watch(
      () => props.show,
      (val) => {
        if (props.message || props.title)
          innerShow.value = val;
      }
    );
    watch(innerShow, (val) => emit("update:show", val));
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
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, Transition as _Transition, withCtx as _withCtx, createBlock as _createBlock } from "vue";
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
  return _openBlock(), _createBlock(_Transition, { name: "fan" }, {
    default: _withCtx(() => [
      _ctx.innerShow ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode("div", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            _ctx.title ? (_openBlock(), _createElementBlock(
              "div",
              _hoisted_4,
              _toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            _createElementVNode(
              "div",
              {
                class: _normalizeClass(["fan-dialog__c", { "fan-dialog__his_title": !_ctx.title }])
              },
              _toDisplayString(_ctx.message),
              3
              /* TEXT, CLASS */
            )
          ]),
          _createElementVNode("div", _hoisted_5, [
            _ctx.showCancel ? (_openBlock(), _createElementBlock(
              "div",
              {
                key: 0,
                class: "fan-dialog__btn fan-flex-center fan-hairline--right fan-dialog__cancel",
                style: _normalizeStyle({ "--dialog-cancel": _ctx.cancelColor }),
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCancel && _ctx.onCancel(...args))
              },
              _toDisplayString(_ctx.cancelText),
              5
              /* TEXT, STYLE */
            )) : _createCommentVNode("v-if", true),
            _createElementVNode(
              "div",
              {
                class: "fan-dialog__btn fan-flex-center",
                style: _normalizeStyle({ "--dialog-confirm": _ctx.confirmColor }),
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onConfirm && _ctx.onConfirm(...args))
              },
              _toDisplayString(_ctx.confirmText),
              5
              /* TEXT, STYLE */
            )
          ])
        ])
      ])) : _createCommentVNode("v-if", true)
    ]),
    _: 1
    /* STABLE */
  });
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
