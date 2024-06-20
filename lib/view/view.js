var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_view_sfc = require("./view-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("View")[0],
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
    const theStyle = (0, import_vue.computed)(() => {
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
      return (0, import_utils.transformStyleSize)(obj);
    });
    return { theStyle };
  }
});
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: (0, import_vue2.normalizeClass)([_ctx.className, { "fan-bgimg-wfit": _ctx.bgFit === "widthFix" }]),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    },
    [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
