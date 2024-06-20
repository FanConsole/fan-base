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
var import_price_sfc = require("./price-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Price")[0],
  props: {
    value: [String, Number],
    // 价格 整数、小数 分开显示大小
    split: {
      type: Boolean,
      default: false
    },
    bold: [Boolean, Number, String],
    color: {
      type: String
      // default: '#FE3F19'
    },
    size: {
      type: [String, Number]
    },
    symbol: {
      type: [String, Boolean],
      default: "\xA5"
    },
    symbolPosition: {
      type: String,
      default: "left",
      validator: (value) => ["left", "right"].includes(value)
    },
    symbolStyle: [String, Object],
    // 较小项（符号symbol、split的小数位）的大小
    subSize: {
      type: [String, Number]
      // default: '0.67em'
    },
    // 符号与数字间距
    space: {
      type: [String, Number],
      default: "1px"
    },
    font: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const theStyle = (0, import_vue.computed)(() => {
      const { color, size, bold } = props;
      let s = "";
      if (color)
        s += `color:${color};`;
      if (size)
        s += `font-size:${(0, import_utils.transformSize)(size)};`;
      if (typeof bold === "number" || typeof bold === "string" && Number(bold) >= 100)
        s += `font-weight:${bold};`;
      return s;
    });
    const subFontSize = (0, import_vue.computed)(() => (0, import_utils.transformSize)(props.subSize));
    const theSymbolStyle = (0, import_vue.computed)(() => {
      const { symbolStyle, symbolPosition, space } = props;
      const pad = (0, import_utils.transformSize)(space);
      let s = symbolPosition === "right" ? `padding-left:${pad};` : `padding-right:${pad};`;
      if (subFontSize.value)
        s += `font-size:${subFontSize.value};`;
      return (0, import_utils.transformStyleSize)(symbolStyle) + s;
    });
    const priceChars = (0, import_vue.computed)(() => {
      let arr = ["", ""];
      const value = String(
        typeof props.value === "undefined" ? "" : props.value
      );
      if (props.split && value.includes(".")) {
        arr = value.split(".");
        arr[1] = `.${arr[1]}`;
      } else {
        arr[0] = value;
      }
      return arr;
    });
    return { theStyle, subFontSize, theSymbolStyle, priceChars };
  }
});
const _hoisted_1 = { class: "fan-price__val" };
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: (0, import_vue2.normalizeClass)(["fan-price", { "fan-price--bold": _ctx.bold, "fan-price--font": _ctx.font }])
    },
    [
      (0, import_vue2.createCommentVNode)(" \u6CE8\u610F\u6D88\u9664\u5143\u7D20\u95F4\u95F4\u8DDD "),
      _ctx.symbol && _ctx.symbolPosition === "left" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "span",
        {
          key: 0,
          class: "fan-price--s",
          style: (0, import_vue2.normalizeStyle)(_ctx.theSymbolStyle)
        },
        (0, import_vue2.toDisplayString)(_ctx.symbol),
        5
        /* TEXT, STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      (0, import_vue2.createElementVNode)(
        "span",
        _hoisted_1,
        (0, import_vue2.toDisplayString)(_ctx.priceChars[0]),
        1
        /* TEXT */
      ),
      _ctx.priceChars[1] ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "span",
        {
          key: 1,
          class: "fan-price--s",
          style: (0, import_vue2.normalizeStyle)({ fontSize: _ctx.subFontSize })
        },
        (0, import_vue2.toDisplayString)(_ctx.priceChars[1]),
        5
        /* TEXT, STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      _ctx.symbol && _ctx.symbolPosition === "right" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "span",
        {
          key: 2,
          class: "fan-price--s",
          style: (0, import_vue2.normalizeStyle)(_ctx.theSymbolStyle)
        },
        (0, import_vue2.toDisplayString)(_ctx.symbol),
        5
        /* TEXT, STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
