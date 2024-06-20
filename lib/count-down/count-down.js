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
var import_vue = require("vue");
var import_utils = require("../utils");
var import_util = require("./util");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("CountDown")[0],
  props: {
    // 毫秒时间戳
    time: {
      type: [String, Number]
    },
    autoStart: {
      type: [Boolean, String],
      default: true
    },
    // 默认 时分秒，可以指定一个统一的分隔符，TODO: 分别指定
    separator: {
      type: [String, Object]
    },
    daySeparator: {
      type: [String, Object]
    },
    separatorStyle: {
      type: String
    },
    blockStyle: {
      type: String
    },
    // 要天不
    day: {
      type: [Boolean, String],
      default: false
    },
    hour: {
      type: [Boolean, String],
      default: true
    },
    minute: {
      type: [Boolean, String],
      default: true
    },
    // 要毫秒不
    millisecond: {
      type: [Boolean, String],
      default: false
    },
    // 毫秒前面加0
    doubleDigitMill: {
      type: Boolean,
      default: false
    }
  },
  emits: ["finish"],
  setup(props, context) {
    const theBlockStyle = (0, import_vue.computed)(() => (0, import_utils.transformStyleSize)(props.blockStyle));
    const theSepStyle = (0, import_vue.computed)(
      () => (0, import_utils.transformStyleSize)(props.separatorStyle)
    );
    let tid;
    let counting;
    let remain = 0;
    let endTime = 0;
    const timeData = (0, import_vue.ref)((0, import_utils.parseTimeData)(0));
    const pause = () => {
      counting = false;
      (0, import_util.cancelRaf)(tid);
    };
    const setRemain = (value) => {
      remain = value;
      timeData.value = (0, import_utils.parseTimeData)(value, props.day);
      if (value === 0) {
        pause();
        context.emit("finish");
      }
    };
    const getRemain = () => {
      return Math.max(endTime - Date.now(), 0);
    };
    const microTick = () => {
      tid = (0, import_util.raf)(() => {
        setRemain(getRemain());
        if (remain !== 0) {
          microTick();
        }
      });
    };
    const macroTick = () => {
      tid = (0, import_util.raf)(() => {
        const value = getRemain();
        if (!(0, import_util.isSameSecond)(value, remain) || value === 0) {
          setRemain(value);
        }
        if (remain !== 0) {
          macroTick();
        }
      });
    };
    const tick = () => {
      props.millisecond ? microTick() : macroTick();
    };
    const start = () => {
      if (counting)
        return;
      counting = true;
      endTime = Date.now() + remain;
      tick();
    };
    const reset = () => {
      pause();
      if (!props.time)
        return;
      remain = props.time;
      setRemain(remain);
      props.autoStart && start();
    };
    (0, import_vue.watch)(() => props.time, reset, { immediate: true });
    (0, import_vue.onBeforeUnmount)(() => {
      (0, import_util.cancelRaf)(tid);
      tid = null;
    });
    return { theBlockStyle, theSepStyle, timeData, reset };
  }
});
const _hoisted_1 = { class: "fan-flex fan-align-center fan-count-down" };
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    _ctx.day ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
      import_vue2.Fragment,
      { key: 0 },
      [
        (0, import_vue2.createElementVNode)(
          "div",
          {
            style: (0, import_vue2.normalizeStyle)(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          (0, import_vue2.toDisplayString)(_ctx.timeData.days),
          5
          /* TEXT, STYLE */
        ),
        (0, import_vue2.createElementVNode)(
          "div",
          {
            style: (0, import_vue2.normalizeStyle)(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          (0, import_vue2.toDisplayString)(_ctx.daySeparator ? _ctx.daySeparator : "\u5929"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : (0, import_vue2.createCommentVNode)("v-if", true),
    _ctx.hour ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
      import_vue2.Fragment,
      { key: 1 },
      [
        (0, import_vue2.createElementVNode)(
          "div",
          {
            style: (0, import_vue2.normalizeStyle)(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          (0, import_vue2.toDisplayString)(_ctx.timeData.hours),
          5
          /* TEXT, STYLE */
        ),
        (0, import_vue2.createElementVNode)(
          "div",
          {
            style: (0, import_vue2.normalizeStyle)(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          (0, import_vue2.toDisplayString)(_ctx.separator ? _ctx.separator : "\u65F6"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : (0, import_vue2.createCommentVNode)("v-if", true),
    _ctx.minute ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
      import_vue2.Fragment,
      { key: 2 },
      [
        (0, import_vue2.createElementVNode)(
          "div",
          {
            style: (0, import_vue2.normalizeStyle)(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          (0, import_vue2.toDisplayString)(_ctx.timeData.minutes),
          5
          /* TEXT, STYLE */
        ),
        (0, import_vue2.createElementVNode)(
          "div",
          {
            style: (0, import_vue2.normalizeStyle)(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          (0, import_vue2.toDisplayString)(_ctx.separator ? _ctx.separator : "\u5206"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : (0, import_vue2.createCommentVNode)("v-if", true),
    (0, import_vue2.createElementVNode)(
      "div",
      {
        style: (0, import_vue2.normalizeStyle)(_ctx.theBlockStyle),
        class: "fan-count-down__block"
      },
      (0, import_vue2.toDisplayString)(_ctx.timeData.seconds),
      5
      /* TEXT, STYLE */
    ),
    _ctx.millisecond || !_ctx.separator ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
      "div",
      {
        key: 3,
        style: (0, import_vue2.normalizeStyle)(_ctx.theSepStyle),
        class: "fan-count-down__sep"
      },
      (0, import_vue2.toDisplayString)(_ctx.separator ? _ctx.separator : "\u79D2"),
      5
      /* TEXT, STYLE */
    )) : (0, import_vue2.createCommentVNode)("v-if", true),
    _ctx.millisecond ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
      "div",
      {
        key: 4,
        style: (0, import_vue2.normalizeStyle)(_ctx.theBlockStyle),
        class: "fan-count-down__block"
      },
      (0, import_vue2.toDisplayString)(_ctx.doubleDigitMill ? "0" : "") + (0, import_vue2.toDisplayString)(_ctx.timeData.milliseconds),
      5
      /* TEXT, STYLE */
    )) : (0, import_vue2.createCommentVNode)("v-if", true)
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
