import { computed, defineComponent, onBeforeUnmount, ref, watch } from "vue";
import { createNamespace, transformStyleSize, parseTimeData } from "../utils";
import { isSameSecond, raf, cancelRaf } from "./util";
const __vue_sfc__ = defineComponent({
  name: createNamespace("CountDown")[0],
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
    const theBlockStyle = computed(() => transformStyleSize(props.blockStyle));
    const theSepStyle = computed(
      () => transformStyleSize(props.separatorStyle)
    );
    let tid;
    let counting;
    let remain = 0;
    let endTime = 0;
    const timeData = ref(parseTimeData(0));
    const pause = () => {
      counting = false;
      cancelRaf(tid);
    };
    const setRemain = (value) => {
      remain = value;
      timeData.value = parseTimeData(value, props.day);
      if (value === 0) {
        pause();
        context.emit("finish");
      }
    };
    const getRemain = () => {
      return Math.max(endTime - Date.now(), 0);
    };
    const microTick = () => {
      tid = raf(() => {
        setRemain(getRemain());
        if (remain !== 0) {
          microTick();
        }
      });
    };
    const macroTick = () => {
      tid = raf(() => {
        const value = getRemain();
        if (!isSameSecond(value, remain) || value === 0) {
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
    watch(() => props.time, reset, { immediate: true });
    onBeforeUnmount(() => {
      cancelRaf(tid);
      tid = null;
    });
    return { theBlockStyle, theSepStyle, timeData, reset };
  }
});
import { toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue";
const _hoisted_1 = { class: "fan-flex fan-align-center fan-count-down" };
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _ctx.day ? (_openBlock(), _createElementBlock(
      _Fragment,
      { key: 0 },
      [
        _createElementVNode(
          "div",
          {
            style: _normalizeStyle(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          _toDisplayString(_ctx.timeData.days),
          5
          /* TEXT, STYLE */
        ),
        _createElementVNode(
          "div",
          {
            style: _normalizeStyle(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          _toDisplayString(_ctx.daySeparator ? _ctx.daySeparator : "\u5929"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : _createCommentVNode("v-if", true),
    _ctx.hour ? (_openBlock(), _createElementBlock(
      _Fragment,
      { key: 1 },
      [
        _createElementVNode(
          "div",
          {
            style: _normalizeStyle(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          _toDisplayString(_ctx.timeData.hours),
          5
          /* TEXT, STYLE */
        ),
        _createElementVNode(
          "div",
          {
            style: _normalizeStyle(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          _toDisplayString(_ctx.separator ? _ctx.separator : "\u65F6"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : _createCommentVNode("v-if", true),
    _ctx.minute ? (_openBlock(), _createElementBlock(
      _Fragment,
      { key: 2 },
      [
        _createElementVNode(
          "div",
          {
            style: _normalizeStyle(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          _toDisplayString(_ctx.timeData.minutes),
          5
          /* TEXT, STYLE */
        ),
        _createElementVNode(
          "div",
          {
            style: _normalizeStyle(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          _toDisplayString(_ctx.separator ? _ctx.separator : "\u5206"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : _createCommentVNode("v-if", true),
    _createElementVNode(
      "div",
      {
        style: _normalizeStyle(_ctx.theBlockStyle),
        class: "fan-count-down__block"
      },
      _toDisplayString(_ctx.timeData.seconds),
      5
      /* TEXT, STYLE */
    ),
    _ctx.millisecond || !_ctx.separator ? (_openBlock(), _createElementBlock(
      "div",
      {
        key: 3,
        style: _normalizeStyle(_ctx.theSepStyle),
        class: "fan-count-down__sep"
      },
      _toDisplayString(_ctx.separator ? _ctx.separator : "\u79D2"),
      5
      /* TEXT, STYLE */
    )) : _createCommentVNode("v-if", true),
    _ctx.millisecond ? (_openBlock(), _createElementBlock(
      "div",
      {
        key: 4,
        style: _normalizeStyle(_ctx.theBlockStyle),
        class: "fan-count-down__block"
      },
      _toDisplayString(_ctx.doubleDigitMill ? "0" : "") + _toDisplayString(_ctx.timeData.milliseconds),
      5
      /* TEXT, STYLE */
    )) : _createCommentVNode("v-if", true)
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
