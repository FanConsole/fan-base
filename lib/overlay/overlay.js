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
var import_overlay_sfc = require("./overlay-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Overlay")[0],
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    zIndex: {
      type: [String, Number],
      default: 1
    },
    duration: {
      type: [String, Number],
      default: 0.3
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const theStyle = (0, import_vue.computed)(() => {
      const { zIndex, duration } = props;
      return `z-index:${zIndex};--fan-overlay-time:${duration}s;`;
    });
    const isShow = (0, import_vue.ref)(props.show);
    const className = (0, import_vue.ref)("");
    const enter = (show) => {
      className.value = "fan-overlay-enter-active";
      isShow.value = show;
      setTimeout(() => {
        className.value = "";
      }, props.duration * 1e3);
    };
    const leave = (show) => {
      className.value = "fan-overlay-leave-active";
      setTimeout(() => {
        isShow.value = show;
        className.value = "";
      }, props.duration * 1e3);
    };
    const close = () => {
      emit("click");
    };
    (0, import_vue.watch)(
      () => props.show,
      (val, old) => {
        if (val === old)
          return;
        val ? enter(val) : leave(val);
      }
    );
    const fn = () => null;
    return { isShow, theStyle, className, close, fn };
  }
});
function __vue_render__(_ctx, _cache) {
  return _ctx.isShow ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 0,
      class: (0, import_vue2.normalizeClass)(["fan-overlay", _ctx.className]),
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (0, import_vue2.withModifiers)((...args) => _ctx.fn && _ctx.fn(...args), ["prevent", "stop"]))
    },
    [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  )) : (0, import_vue2.createCommentVNode)("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
