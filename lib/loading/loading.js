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
var import_loading_sfc = require("./loading-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Loading")[0],
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
    const theStyle = (0, import_vue.computed)(() => {
      const { color, textSize, textColor } = props;
      return (0, import_utils.transformStyleSize)({
        color: textColor || color,
        fontSize: textSize
      });
    });
    const iconStyle = (0, import_vue.computed)(() => {
      const { size, color } = props;
      const s = (0, import_utils.transformSize)(size);
      let str = `width:${s};height:${s};color:${color};`;
      return str;
    });
    return { array12, array3, theStyle, iconStyle };
  }
});
const _hoisted_1 = { class: "fan-loading__t" };
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: (0, import_vue2.normalizeClass)(["fan-loading", {
        "fan-loading--inline": _ctx.inline,
        "fan-loading--vertical": _ctx.vertical
      }]),
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: (0, import_vue2.normalizeClass)(["fan-loading__i", "fan-loading__i--" + _ctx.type]),
          style: (0, import_vue2.normalizeStyle)(_ctx.iconStyle)
        },
        [
          _ctx.type === "spinner" ? ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            { key: 0 },
            (0, import_vue2.renderList)(_ctx.array12, (_, index) => {
              return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
                key: index,
                class: "fan-loading__dot"
              });
            }),
            128
            /* KEYED_FRAGMENT */
          )) : (0, import_vue2.createCommentVNode)("v-if", true),
          _ctx.type === "line" ? ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            { key: 1 },
            (0, import_vue2.renderList)(_ctx.array3, (_, index) => {
              return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
                key: index,
                class: "fan-loading__ldot"
              });
            }),
            128
            /* KEYED_FRAGMENT */
          )) : (0, import_vue2.createCommentVNode)("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      ),
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        (0, import_vue2.renderSlot)(_ctx.$slots, "default")
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
