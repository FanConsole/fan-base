import "./count-to-sfc.css";
import {
  defineComponent,
  ref,
  watchEffect,
  watch,
  computed,
  onMounted,
  onDeactivated
} from "vue";
import {
  createNamespace,
  transformSize,
  transformStyleSize,
  roundNumber,
  padNumber
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("CountTo")[0],
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
    const numList = ref([0]);
    const startVal = ref(props.startNum);
    const endVal = ref(props.endNum);
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
        startNum[0] = padNumber(startNum[0], maxIntegerLength);
      if (!start[1] && maxDecimalLength !== 0) {
        startNum[1] = padNumber(0, maxDecimalLength);
      } else if (((_h = start[1]) == null ? void 0 : _h.length) < maxDecimalLength) {
        startNum[1] = padNumber(startNum[1], maxDecimalLength, { right: true });
      }
      return startNum.length === 2 ? startNum.join(".").split("") : startNum.join("").split("");
    };
    const translateList = computed(() => {
      const translate = [];
      numList.value.forEach(
        (num) => translate.push(`transform: translate(0, -${num * 10}%)`)
      );
      return translate;
    });
    const theStyle = computed(() => {
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
        s += `--fan-count-to-size: ${transformSize(
          textSize
        )};--fan-count-to-height: ${transformSize(
          parseFloat(textSize) * 1.4
        )};`;
      if (bold)
        s += `--fan-count-to-weight: ${bold};`;
      if (color)
        s += `--fan-count-to-color: ${color};`;
      if (radius)
        s += `--fan-count-to-radius: ${transformSize(radius)};`;
      if (height)
        s += `--fan-count-to-height: ${transformSize(height)};`;
      if (width)
        s += `--fan-count-to-width: ${transformSize(width)};`;
      if (marginRight)
        s += `--fan-count-to-margin: ${transformSize(marginRight)};`;
      if (duration)
        s += `--fan-count-to-duration:${duration}s;`;
      if (symbolWidth)
        s += `--fan-count-to-symbol-width:${transformSize(symbolWidth)}`;
      if (lineHeight)
        s += `--fan-count-to-line-height: ${transformSize(lineHeight)}`;
      return transformStyleSize(s);
    });
    watchEffect(() => {
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
          startVal.value = roundNumber(
            Number(startVal.value) - Number(step),
            decimalLength
          );
          if (Number(startVal.value) <= Number(endVal.value))
            return onFinish();
        } else {
          startVal.value = roundNumber(
            Number(startVal.value) + Number(step),
            decimalLength
          );
          if (Number(startVal.value) >= Number(endVal.value))
            return onFinish();
        }
      }, Number(speed) * 1e3);
    };
    watch(
      () => props.endNum,
      (val) => endVal.value = val,
      { immediate: true }
    );
    watch(
      () => props.startNum,
      (val) => startVal.value = val,
      { immediate: true }
    );
    onMounted(() => increaseNumber());
    onDeactivated(() => clearInterval(timer));
    return {
      theStyle,
      translateList,
      numList
    };
  }
});
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = { class: "fan-flex fan-align-center" };
const _hoisted_2 = /* @__PURE__ */ _createElementVNode(
  "span",
  { class: "number-item_num_box" },
  [
    /* @__PURE__ */ _createElementVNode("span", { class: "number-item_num__txt" }, "0123456789")
  ],
  -1
  /* HOISTED */
);
const _hoisted_3 = [
  _hoisted_2
];
const _hoisted_4 = { key: 1 };
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: "count-to",
      style: _normalizeStyle(_ctx.theStyle)
    },
    [
      _createElementVNode("div", _hoisted_1, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(_ctx.numList, (item, i) => {
            return _openBlock(), _createElementBlock(
              "p",
              {
                class: _normalizeClass(["count-to_num", [isNaN(item) ? "number_symbol" : "number-item"]]),
                key: i
              },
              [
                !isNaN(item) ? (_openBlock(), _createElementBlock(
                  "span",
                  {
                    key: 0,
                    class: "number-item_num",
                    style: _normalizeStyle(_ctx.translateList[i])
                  },
                  [..._hoisted_3],
                  4
                  /* STYLE */
                )) : (_openBlock(), _createElementBlock(
                  "span",
                  _hoisted_4,
                  _toDisplayString(item),
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
export {
  stdin_default as default
};
