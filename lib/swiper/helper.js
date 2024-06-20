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
  swiperEmits: () => swiperEmits,
  swiperProps: () => swiperProps,
  useSwiperState: () => useSwiperState
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
const swiperProps = {
  current: {
    type: Number,
    default: 0
  },
  aspectRatio: {
    type: [Number, String],
    default: 2.7
  },
  list: {
    type: Array,
    default: () => []
    // [{ cover: string, ... }]
  },
  loop: Boolean,
  autoplay: {
    type: Number,
    default: 3500
  },
  // 风格，1-常规，2-一屏3个，左右露出相邻 item 的小部分
  type: {
    type: [Number, String],
    default: 1
  },
  innerRadius: [String, Number],
  // 是否显示指示器
  indicator: {
    type: Boolean,
    default: true
  },
  // 当前选中的指示点颜色
  indicatorActiveColor: {
    type: String,
    default: "var(--fan-primary-color)"
  },
  autoHeight: {
    type: Boolean,
    default: false
  },
  //开启纵向滑动
  vertical: {
    type: Boolean,
    default: false
  }
};
const swiperEmits = ["click", "update:current", "change"];
const useSwiperState = (props) => {
  const swiperWidth = (0, import_vue.ref)(375);
  const swiperAspectRatio = (0, import_vue.computed)(() => {
    const { type, aspectRatio, autoHeight } = props;
    if (autoHeight)
      return 0;
    const ar = (0, import_utils.resolveAspectRatio)(aspectRatio);
    if (type !== 2)
      return ar;
    const w = swiperWidth.value;
    return w / ((w - 76) / ar);
  });
  return { swiperWidth, swiperAspectRatio };
};
