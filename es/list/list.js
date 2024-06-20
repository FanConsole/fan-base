import "./list-sfc.css";
import { computed, defineComponent } from "vue";
import Loading from "../loading/loading.js";
import { createNamespace, transformSize } from "../utils";
import { usePageLifecycle } from "../hooks";
const __vue_sfc__ = defineComponent({
  name: createNamespace("List")[0],
  components: { Loading },
  props: {
    /**
     * 是否处于隐藏状态，此时不触发触底
     */
    hidden: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: "loading",
      validator: (value) => {
        return ["loading", "hasMore", "noMore", "error"].includes(value);
      }
    },
    loadingColor: String,
    loadingSize: {
      type: [Number, String],
      default: 22
    },
    loadingText: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: "#999"
    },
    noMoreText: {
      type: String,
      default: "\u6CA1\u6709\u66F4\u591A\u4E86"
    },
    errorText: {
      type: String,
      default: "\u52A0\u8F7D\u5931\u8D25"
    }
  },
  emits: ["load", "errorClick"],
  setup(props, context) {
    const text = computed(() => {
      const { loadingText, noMoreText, errorText, status } = props;
      if (status === "noMore")
        return noMoreText;
      if (status === "error")
        return errorText;
      return loadingText;
    });
    const textSize = computed(() => {
      return `calc(${transformSize(props.loadingSize)} * 0.64)`;
    });
    const showLoading = computed(() => {
      return props.status === "loading" || props.status === "hasMore";
    });
    const { onPageReachBottom } = usePageLifecycle();
    onPageReachBottom(() => {
      !props.hidden && context.emit("load");
    });
    const onErrorClick = () => {
      if (props.status !== "error")
        return;
      context.emit("errorClick");
    };
    return { text, textSize, showLoading, onErrorClick };
  }
});
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = { class: "fan-list" };
const _hoisted_2 = { class: "fan-list__loadt" };
function __vue_render__(_ctx, _cache) {
  const _component_Loading = _resolveComponent("Loading");
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _renderSlot(_ctx.$slots, "default"),
    _ctx.showLoading || _ctx.text ? (_openBlock(), _createElementBlock(
      "div",
      {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onErrorClick && _ctx.onErrorClick(...args)),
        class: "fan-flex fan-align-center fan-justify-center fan-list__load",
        style: _normalizeStyle({ fontSize: _ctx.textSize, color: _ctx.textColor })
      },
      [
        _ctx.showLoading ? (_openBlock(), _createBlock(_component_Loading, {
          key: 0,
          size: _ctx.loadingSize,
          color: _ctx.loadingColor
        }, null, 8, ["size", "color"])) : _createCommentVNode("v-if", true),
        _createElementVNode(
          "span",
          _hoisted_2,
          _toDisplayString(_ctx.text),
          1
          /* TEXT */
        )
      ],
      4
      /* STYLE */
    )) : _createCommentVNode("v-if", true)
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
