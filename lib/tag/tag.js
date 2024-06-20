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
var import_tag_sfc = require("./tag-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Tag")[0],
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
    const theStyle = (0, import_vue.computed)(() => {
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
        obj.fontSize = (0, import_utils.transformSize)(textSize);
      if (plain && (color || borderColor))
        obj["--fan2-tag-border-color"] = borderColor || color;
      if (radius || radius === 0)
        obj["--fan2-tag-border-radius"] = radius;
      return (0, import_utils.transformStyleSize)(obj);
    });
    const inStyle = (0, import_vue.computed)(() => {
      const s = "max-width:100%;";
      const size = props.textSize;
      if (!(0, import_utils.isCssRelativeSize)(size) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(size, 10) / 12;
        if (zoom < 1)
          return `${s}font-size:${(0, import_utils.transformSize)("12px")};zoom:${zoom};`;
      }
      return s;
    });
    const onClick = (e) => {
      emit("click", e);
    };
    return { theStyle, inStyle, onClick };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "fan2-tag__hairline"
};
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: (0, import_vue2.normalizeClass)(["fan2-tag", {
        "fan2-tag--noborder": !_ctx.border,
        "fan2-tag--hairline": _ctx.hairline,
        "fan2-tag--plain": _ctx.plain,
        "fan2-tag--bold": _ctx.bold
      }]),
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      (0, import_vue2.createCommentVNode)(" fix\uFF1Auniapp-App-\u4F2A\u5143\u7D20\u8D85\u4E0D\u51FA100% "),
      _ctx.hairline ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1)) : (0, import_vue2.createCommentVNode)("v-if", true),
      (0, import_vue2.createElementVNode)(
        "div",
        {
          style: (0, import_vue2.normalizeStyle)(_ctx.inStyle),
          class: "fan-ellipsis"
        },
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
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
