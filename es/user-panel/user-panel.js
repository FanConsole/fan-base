import "./user-panel-sfc.css";
import { defineComponent } from "vue";
import FanImage from "../image/image.js";
import FanLoading from "../loading/loading.js";
import FanRichText from "../rich-text/rich-text.js";
import { createNamespace } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("UserPanel")[0],
  components: { FanImage, FanLoading, FanRichText },
  props: {
    hasLogin: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: "https://img.dac6.cn/resource/avatar.png"
    },
    name: {
      type: String,
      default: "\u7528\u6237\u6635\u79F0"
    },
    role: String,
    vip: Boolean,
    desc: String
  },
  emits: ["click"],
  setup() {
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, createBlock as _createBlock } from "vue";
const _hoisted_1 = { class: "fan-upanel" };
const _hoisted_2 = {
  key: 0,
  class: "fan-flex-1 fan-flex"
};
const _hoisted_3 = {
  key: 1,
  class: "fan-flex-1"
};
const _hoisted_4 = {
  class: "fan-flex fan-align-center",
  style: { "flex-wrap": "nowrap" }
};
const _hoisted_5 = { class: "fan-ellipsis fan-upanel__name" };
const _hoisted_6 = {
  key: 2,
  class: "fan-flex-1"
};
const _hoisted_7 = /* @__PURE__ */ _createElementVNode(
  "div",
  {
    class: "fan-flex fan-align-center",
    style: { "flex-wrap": "nowrap" }
  },
  [
    /* @__PURE__ */ _createElementVNode("div", { class: "fan-ellipsis fan-upanel__name" }, "\u70B9\u51FB\u767B\u5F55")
  ],
  -1
  /* HOISTED */
);
const _hoisted_8 = /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "fan-upanel__desc" },
  "\u767B\u5F55\u540E\u89E3\u9501\u66F4\u591A\u5B9E\u7528\u529F\u80FD",
  -1
  /* HOISTED */
);
const _hoisted_9 = [
  _hoisted_7,
  _hoisted_8
];
function __vue_render__(_ctx, _cache) {
  const _component_FanImage = _resolveComponent("FanImage");
  const _component_FanLoading = _resolveComponent("FanLoading");
  const _component_FanRichText = _resolveComponent("FanRichText");
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      class: "fan-flex-center fan-upanel__in",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
    }, [
      _createVNode(_component_FanImage, {
        width: "60px",
        height: "60px",
        src: _ctx.avatar,
        mode: "aspectFill",
        radius: "50%",
        style: { marginRight: "15px" }
      }, null, 8, ["src"]),
      _ctx.hasLogin && _ctx.loading ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
        _createVNode(_component_FanLoading, {
          type: "line",
          color: "var(--fan-primary-color)"
        })
      ])) : _ctx.hasLogin ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
        _createElementVNode("div", _hoisted_4, [
          _createElementVNode(
            "div",
            _hoisted_5,
            _toDisplayString(_ctx.name),
            1
            /* TEXT */
          ),
          _ctx.role ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass(["fan-upanel__role", { vip: _ctx.vip }])
            },
            _toDisplayString(_ctx.role),
            3
            /* TEXT, CLASS */
          )) : _createCommentVNode("v-if", true)
        ]),
        _ctx.desc ? (_openBlock(), _createBlock(_component_FanRichText, {
          key: 0,
          class: "fan-upanel__desc",
          content: _ctx.desc
        }, null, 8, ["content"])) : _createCommentVNode("v-if", true)
      ])) : (_openBlock(), _createElementBlock("div", _hoisted_6, [..._hoisted_9]))
    ])
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
