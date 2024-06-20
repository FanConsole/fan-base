import "./tag-sfc.css";
import { defineComponent, computed } from "vue";
import {
  createNamespace,
  isCssRelativeSize,
  transformSize,
  transformStyleSize
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Tag")[0],
  emits: ["click"],
  props: {
    color: String,
    bg: String,
    width: String,
    height: String,
    margin: String,
    padding: String,
    textSize: {
      type: [String, Number]
    },
    textColor: String,
    bold: [Boolean, String],
    /**
     * 是否为朴素模式
     */
    plain: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有边框，plain朴素时生效
     */
    border: {
      type: [Boolean, String],
      default: true
    },
    /**
     * 边框颜色，默认为 color
     */
    borderColor: String,
    /**
     * 圆角
     */
    radius: [String, Number],
    /**
     * 是否使用 0.5px 边框
     */
    hairline: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const {
        color,
        bg: background,
        plain,
        textSize,
        textColor,
        radius,
        borderColor
      } = props;
      const obj = {};
      ["width", "height", "padding", "margin"].forEach(
        (k) => props[k] && (obj[k] = props[k])
      );
      const bg = background || (plain ? "white" : color);
      if (bg)
        obj["--fan2-tag-bg"] = bg;
      const c = textColor || (plain ? color || "var(--fan-primary-color)" : !color ? "" : "white");
      if (c)
        obj["--fan2-tag-text-color"] = c;
      if (textSize)
        obj.fontSize = transformSize(textSize);
      if (plain && (color || borderColor))
        obj["--fan2-tag-border-color"] = borderColor || color;
      if (radius || radius === 0)
        obj["--fan2-tag-border-radius"] = radius;
      return transformStyleSize(obj);
    });
    const inStyle = computed(() => {
      const s = "max-width:100%;";
      const size = props.textSize;
      if (!isCssRelativeSize(size) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(size, 10) / 12;
        if (zoom < 1)
          return `${s}font-size:${transformSize("12px")};zoom:${zoom};`;
      }
      return s;
    });
    const onClick = (e) => {
      emit("click", e);
    };
    return { theStyle, inStyle, onClick };
  }
});
import { createCommentVNode as _createCommentVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "fan2-tag__hairline"
};
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass(["fan2-tag", {
        "fan2-tag--noborder": !_ctx.border,
        "fan2-tag--hairline": _ctx.hairline,
        "fan2-tag--plain": _ctx.plain,
        "fan2-tag--bold": _ctx.bold
      }]),
      style: _normalizeStyle(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      _createCommentVNode(" fix\uFF1Auniapp-App-\u4F2A\u5143\u7D20\u8D85\u4E0D\u51FA100% "),
      _ctx.hairline ? (_openBlock(), _createElementBlock("div", _hoisted_1)) : _createCommentVNode("v-if", true),
      _createElementVNode(
        "div",
        {
          style: _normalizeStyle(_ctx.inStyle),
          class: "fan-ellipsis"
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      )
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
