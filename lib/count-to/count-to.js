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
var import_count_to_sfc = require("./count-to-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("CountTo")[0],
  emits: ["finish"],
  props: {
    startNum: {
      type: [Number, String],
      default: 0
    },
    endNum: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 1
    },
    // 数字切换的时间 单位为秒
    speed: {
      type: [Number, String],
      default: 1
    },
    // 数字切换时动画的时间 单位为秒
    duration: [String, Number],
    color: String,
    bg: String,
    textSize: [String, Number],
    bold: [String, Number],
    height: [String, Number],
    width: [String, Number],
    symbolWidth: [String, Number],
    radius: [String, Number],
    marginRight: [Number, String],
    lineHeight: [Number, String]
  },
  setup(props, { emit }) {
    const numList = (0, import_vue.ref)([0]);
    const startVal = (0, import_vue.ref)(props.startNum);
    const endVal = (0, import_vue.ref)(props.endNum);
    let decimalLength = 0;
    let isMinus = false;
    let timer = null;
    const initNumList = (start, end) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      start = start.split(".");
      end = end.split(".");
      const step = String(props.step).split(".");
      let startNum = JSON.parse(JSON.stringify(start));
      const maxIntegerLength = Math.max(
        ((_a = start[0]) == null ? void 0 : _a.length) || 0,
        ((_b = end[0]) == null ? void 0 : _b.length) || 0,
        ((_c = step[0]) == null ? void 0 : _c.length) || 0
      ), maxDecimalLength = Math.max(
        ((_d = start[1]) == null ? void 0 : _d.length) || 0,
        ((_e = end[1]) == null ? void 0 : _e.length) || 0,
        ((_f = step[1]) == null ? void 0 : _f.length) || 0
      );
      decimalLength = maxDecimalLength;
      if (((_g = start[0]) == null ? void 0 : _g.length) < maxIntegerLength)
        startNum[0] = (0, import_utils.padNumber)(startNum[0], maxIntegerLength);
      if (!start[1] && maxDecimalLength !== 0) {
        startNum[1] = (0, import_utils.padNumber)(0, maxDecimalLength);
      } else if (((_h = start[1]) == null ? void 0 : _h.length) < maxDecimalLength) {
        startNum[1] = (0, import_utils.padNumber)(startNum[1], maxDecimalLength, { right: true });
      }
      return startNum.length === 2 ? startNum.join(".").split("") : startNum.join("").split("");
    };
    const translateList = (0, import_vue.computed)(() => {
      const translate = [];
      numList.value.forEach(
        (num) => translate.push(`transform: translate(0, -${num * 10}%)`)
      );
      return translate;
    });
    const theStyle = (0, import_vue.computed)(() => {
      const {
        bg,
        textSize,
        bold,
        color,
        height,
        radius,
        width,
        duration,
        marginRight,
        symbolWidth,
        lineHeight
      } = props;
      let s = "";
      if (bg)
        s += `--fan-count-to-bg: ${bg};`;
      if (textSize)
        s += `--fan-count-to-size: ${(0, import_utils.transformSize)(
          textSize
        )};--fan-count-to-height: ${(0, import_utils.transformSize)(
          parseFloat(textSize) * 1.4
        )};`;
      if (bold)
        s += `--fan-count-to-weight: ${bold};`;
      if (color)
        s += `--fan-count-to-color: ${color};`;
      if (radius)
        s += `--fan-count-to-radius: ${(0, import_utils.transformSize)(radius)};`;
      if (height)
        s += `--fan-count-to-height: ${(0, import_utils.transformSize)(height)};`;
      if (width)
        s += `--fan-count-to-width: ${(0, import_utils.transformSize)(width)};`;
      if (marginRight)
        s += `--fan-count-to-margin: ${(0, import_utils.transformSize)(marginRight)};`;
      if (duration)
        s += `--fan-count-to-duration:${duration}s;`;
      if (symbolWidth)
        s += `--fan-count-to-symbol-width:${(0, import_utils.transformSize)(symbolWidth)}`;
      if (lineHeight)
        s += `--fan-count-to-line-height: ${(0, import_utils.transformSize)(lineHeight)}`;
      return (0, import_utils.transformStyleSize)(s);
    });
    (0, import_vue.watchEffect)(() => {
      const start = String(startVal.value), end = String(endVal.value);
      if (startVal.value > endVal.value)
        isMinus = true;
      numList.value = initNumList(start, end);
    });
    const onFinish = () => {
      clearInterval(timer);
      timer = null;
      emit("finish");
    };
    const increaseNumber = () => {
      const { step, speed } = props;
      if (Number(startVal.value) === Number(endVal.value))
        return;
      timer = setInterval(() => {
        if (isMinus) {
          startVal.value = (0, import_utils.roundNumber)(
            Number(startVal.value) - Number(step),
            decimalLength
          );
          if (Number(startVal.value) <= Number(endVal.value))
            return onFinish();
        } else {
          startVal.value = (0, import_utils.roundNumber)(
            Number(startVal.value) + Number(step),
            decimalLength
          );
          if (Number(startVal.value) >= Number(endVal.value))
            return onFinish();
        }
      }, Number(speed) * 1e3);
    };
    (0, import_vue.watch)(
      () => props.endNum,
      (val) => endVal.value = val,
      { immediate: true }
    );
    (0, import_vue.watch)(
      () => props.startNum,
      (val) => startVal.value = val,
      { immediate: true }
    );
    (0, import_vue.onMounted)(() => increaseNumber());
    (0, import_vue.onDeactivated)(() => clearInterval(timer));
    return {
      theStyle,
      translateList,
      numList
    };
  }
});
const _hoisted_1 = { class: "fan-flex fan-align-center" };
const _hoisted_2 = /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "span",
  { class: "number-item_num_box" },
  [
    /* @__PURE__ */ (0, import_vue2.createElementVNode)("span", { class: "number-item_num__txt" }, "0123456789")
  ],
  -1
  /* HOISTED */
);
const _hoisted_3 = [
  _hoisted_2
];
const _hoisted_4 = { key: 1 };
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: "count-to",
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
    },
    [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
          import_vue2.Fragment,
          null,
          (0, import_vue2.renderList)(_ctx.numList, (item, i) => {
            return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
              "p",
              {
                class: (0, import_vue2.normalizeClass)(["count-to_num", [isNaN(item) ? "number_symbol" : "number-item"]]),
                key: i
              },
              [
                !isNaN(item) ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                  "span",
                  {
                    key: 0,
                    class: "number-item_num",
                    style: (0, import_vue2.normalizeStyle)(_ctx.translateList[i])
                  },
                  [..._hoisted_3],
                  4
                  /* STYLE */
                )) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                  "span",
                  _hoisted_4,
                  (0, import_vue2.toDisplayString)(item),
                  1
                  /* TEXT */
                ))
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
