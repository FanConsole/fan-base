import "./price-sfc.css";
import { computed, defineComponent } from "vue";
import { createNamespace, transformSize, transformStyleSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Price")[0],
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
    const theStyle = computed(() => {
      const { color, size, bold } = props;
      let s = "";
      if (color)
        s += `color:${color};`;
      if (size)
        s += `font-size:${transformSize(size)};`;
      if (typeof bold === "number" || typeof bold === "string" && Number(bold) >= 100)
        s += `font-weight:${bold};`;
      return s;
    });
    const subFontSize = computed(() => transformSize(props.subSize));
    const theSymbolStyle = computed(() => {
      const { symbolStyle, symbolPosition, space } = props;
      const pad = transformSize(space);
      let s = symbolPosition === "right" ? `padding-left:${pad};` : `padding-right:${pad};`;
      if (subFontSize.value)
        s += `font-size:${subFontSize.value};`;
      return transformStyleSize(symbolStyle) + s;
    });
    const priceChars = computed(() => {
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
import { createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = { class: "fan-price__val" };
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: _normalizeClass(["fan-price", { "fan-price--bold": _ctx.bold, "fan-price--font": _ctx.font }])
    },
    [
      _createCommentVNode(" \u6CE8\u610F\u6D88\u9664\u5143\u7D20\u95F4\u95F4\u8DDD "),
      _ctx.symbol && _ctx.symbolPosition === "left" ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 0,
          class: "fan-price--s",
          style: _normalizeStyle(_ctx.theSymbolStyle)
        },
        _toDisplayString(_ctx.symbol),
        5
        /* TEXT, STYLE */
      )) : _createCommentVNode("v-if", true),
      _createElementVNode(
        "span",
        _hoisted_1,
        _toDisplayString(_ctx.priceChars[0]),
        1
        /* TEXT */
      ),
      _ctx.priceChars[1] ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 1,
          class: "fan-price--s",
          style: _normalizeStyle({ fontSize: _ctx.subFontSize })
        },
        _toDisplayString(_ctx.priceChars[1]),
        5
        /* TEXT, STYLE */
      )) : _createCommentVNode("v-if", true),
      _ctx.symbol && _ctx.symbolPosition === "right" ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 2,
          class: "fan-price--s",
          style: _normalizeStyle(_ctx.theSymbolStyle)
        },
        _toDisplayString(_ctx.symbol),
        5
        /* TEXT, STYLE */
      )) : _createCommentVNode("v-if", true)
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
