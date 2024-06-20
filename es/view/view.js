import "./view-sfc.css";
import { defineComponent, computed } from "vue";
import { createNamespace, transformStyleSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("View")[0],
  props: {
    className: String,
    width: String,
    height: String,
    position: String,
    flex: {
      type: [Boolean, String],
      default: false
    },
    flex1: {
      type: [Boolean, String],
      default: false
    },
    inline: {
      type: [Boolean, String],
      default: false
    },
    direction: {
      type: String,
      default: "row",
      validator: (value) => ["row", "column"].includes(value)
    },
    align: {
      type: String,
      default: "center",
      validator: (value) => ["flex-start", "center", "flex-end"].includes(value)
    },
    justify: {
      type: String,
      validator: (value) => [
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-evenly",
        "space-around"
      ].includes(value)
    },
    bg: String,
    bgFit: {
      type: String,
      default: "widthFix",
      validator: (value) => ["widthFix"].includes(value)
    },
    border: String,
    radius: String,
    padding: String,
    margin: String
  },
  emits: ["click"],
  setup(props) {
    const theStyle = computed(() => {
      const {
        position,
        flex,
        flex1,
        inline,
        direction,
        align,
        justify,
        bg,
        width,
        height,
        border,
        radius,
        padding,
        margin
      } = props;
      const obj = {};
      if (flex) {
        obj.display = inline ? "inline-flex" : "flex";
        if (direction)
          obj.flexDirection = direction;
        if (align)
          obj.alignItems = align;
        if (justify)
          obj.justifyContent = justify;
      } else if (inline) {
        obj.display = "inline";
      }
      if (flex1)
        obj.flex = 1;
      if (position)
        obj.position = position;
      if (bg)
        obj.background = bg;
      if (width)
        obj.width = width;
      if (height)
        obj.height = height;
      if (padding)
        obj.padding = padding;
      if (margin)
        obj.margin = margin;
      if (border)
        obj.border = border;
      if (radius)
        obj.borderRadius = radius;
      return transformStyleSize(obj);
    });
    return { theStyle };
  }
});
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: _normalizeClass([_ctx.className, { "fan-bgimg-wfit": _ctx.bgFit === "widthFix" }]),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    },
    [
      _renderSlot(_ctx.$slots, "default")
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
