import "./loading-view-sfc.css";
import { defineComponent, ref, computed, watch } from "vue";
import { createNamespace } from "../utils";
import FanLoading from "../loading/loading.js";
import FanIcon from "../icon/icon.js";
import FanButton from "../button/button.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("LoadingView")[0],
  components: {
    FanLoading,
    FanIcon,
    FanButton
  },
  emits: ["buttonClick"],
  props: {
    loading: Boolean,
    // string: message | object: { message, title, button }
    error: [String, Object],
    color: String,
    type: {
      type: String,
      default: "circle2"
    },
    // 用绝对定位撑满父盒子
    full: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const showLoading = ref(false);
    const errorInfo = computed(() => {
      const { error } = props;
      if (!error)
        return null;
      if (typeof error === "string")
        return { message: error };
      return error;
    });
    watch(
      () => props.loading,
      (val) => {
        if (!val) {
          showLoading.value = false;
          return;
        }
        setTimeout(() => {
          if (props.loading)
            showLoading.value = true;
        }, 300);
      },
      { immediate: true }
    );
    const onClick = (e) => {
      context.emit("buttonClick", e);
    };
    return { showLoading, errorInfo, onClick };
  }
});
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createElementBlock as _createElementBlock, createVNode as _createVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, Fragment as _Fragment, normalizeClass as _normalizeClass, renderSlot as _renderSlot } from "vue";
const _hoisted_1 = { key: 0 };
const _hoisted_2 = {
  key: 0,
  class: "fan-loading-view__t"
};
const _hoisted_3 = { key: 1 };
function __vue_render__(_ctx, _cache) {
  const _component_FanLoading = _resolveComponent("FanLoading");
  const _component_FanIcon = _resolveComponent("FanIcon");
  const _component_FanButton = _resolveComponent("FanButton");
  return _ctx.loading ? (_openBlock(), _createElementBlock(
    "div",
    {
      key: 0,
      class: _normalizeClass(["fan-loading-view", { "fan-loading-view--full": _ctx.full }])
    },
    [
      !_ctx.errorInfo ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
        _ctx.showLoading ? (_openBlock(), _createBlock(_component_FanLoading, {
          key: 0,
          color: _ctx.color,
          type: _ctx.type
        }, null, 8, ["color", "type"])) : _createCommentVNode("v-if", true)
      ])) : (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 1 },
        [
          _createVNode(_component_FanIcon, {
            name: "warning-circle-fill",
            size: 34,
            color: "var(--fan-danger-color)"
          }),
          _ctx.errorInfo.message ? (_openBlock(), _createElementBlock(
            "div",
            _hoisted_2,
            _toDisplayString(_ctx.errorInfo.message),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true),
          _ctx.errorInfo.button ? (_openBlock(), _createBlock(_component_FanButton, {
            key: 1,
            round: "",
            bold: "",
            "custom-style": "min-width: 100px;",
            onClick: _ctx.onClick
          }, {
            default: _withCtx(() => [
              _createTextVNode(
                _toDisplayString(_ctx.errorInfo.button),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"])) : _createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  )) : (_openBlock(), _createElementBlock("div", _hoisted_3, [
    _renderSlot(_ctx.$slots, "default")
  ]));
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
