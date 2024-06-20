import "./loading-sfc.css";
import { defineComponent, computed } from "vue";
import { createNamespace, transformSize, transformStyleSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Loading")[0],
  emits: ["click"],
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#c9c9c9"
    },
    type: {
      type: String,
      validator: (value) => ["circle", "circle2", "spinner", "line"].includes(value),
      // default: () => (getSystemInfo().isIos ? 'spinner' : 'circle2')
      default: "circle2"
    },
    size: {
      type: [String, Number],
      default: "30px"
    },
    textSize: {
      type: [String, Number],
      default: "14px"
    },
    /**
     * @default 跟随props.color
     */
    textColor: String,
    /**
     * 是否垂直排列图标和文字内容
     */
    vertical: Boolean
  },
  setup(props) {
    const array12 = Array.from({ length: 12 });
    const array3 = Array.from({ length: 3 });
    const theStyle = computed(() => {
      const { color, textSize, textColor } = props;
      return transformStyleSize({
        color: textColor || color,
        fontSize: textSize
      });
    });
    const iconStyle = computed(() => {
      const { size, color } = props;
      const s = transformSize(size);
      let str = `width:${s};height:${s};color:${color};`;
      return str;
    });
    return { array12, array3, theStyle, iconStyle };
  }
});
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderSlot as _renderSlot } from "vue";
const _hoisted_1 = { class: "fan-loading__t" };
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass(["fan-loading", {
        "fan-loading--inline": _ctx.inline,
        "fan-loading--vertical": _ctx.vertical
      }]),
      style: _normalizeStyle(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    },
    [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass(["fan-loading__i", "fan-loading__i--" + _ctx.type]),
          style: _normalizeStyle(_ctx.iconStyle)
        },
        [
          _ctx.type === "spinner" ? (_openBlock(true), _createElementBlock(
            _Fragment,
            { key: 0 },
            _renderList(_ctx.array12, (_, index) => {
              return _openBlock(), _createElementBlock("div", {
                key: index,
                class: "fan-loading__dot"
              });
            }),
            128
            /* KEYED_FRAGMENT */
          )) : _createCommentVNode("v-if", true),
          _ctx.type === "line" ? (_openBlock(true), _createElementBlock(
            _Fragment,
            { key: 1 },
            _renderList(_ctx.array3, (_, index) => {
              return _openBlock(), _createElementBlock("div", {
                key: index,
                class: "fan-loading__ldot"
              });
            }),
            128
            /* KEYED_FRAGMENT */
          )) : _createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      ),
      _createElementVNode("div", _hoisted_1, [
        _renderSlot(_ctx.$slots, "default")
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
