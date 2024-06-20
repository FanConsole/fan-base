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
var import_aspect_ratio_sfc = require("./aspect-ratio-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("AspectRatio")[0],
  props: {
    /**
     * 盒子宽高比
     * 支持：比值number、a/b、a:b
     * 宽度未知时主要是利用padding的百分比值是相对于包含块（一般是父盒子）的宽度，造出指定比例的容器
     */
    aspectRatio: [Number, String],
    width: [Number, String],
    height: [Number, String]
  },
  emits: ["click"],
  setup(props, { emit }) {
    const resolveAspectRatio = (ar) => {
      if (typeof ar === "string") {
        if (ar.includes("/") || ar.includes(":")) {
          const [a, b] = ar.replace("/", ":").split(":");
          return a / b;
        }
        return Number(ar);
      }
      return ar;
    };
    const state = (0, import_vue.computed)(() => {
      let wrapper = false;
      let wrapperStyle = "";
      let style = "";
      const { aspectRatio, width, height } = props;
      const ar = resolveAspectRatio(aspectRatio);
      const w = (0, import_utils.getCssSizeValue)(width);
      const wUnit = (0, import_utils.transformSize)(width);
      const h = (0, import_utils.getCssSizeValue)(height);
      const hUnit = (0, import_utils.transformSize)(height);
      if (height) {
        if (width) {
          style += `width:${wUnit};height:${hUnit};`;
        } else if (ar && !(0, import_utils.isCssRelativeSize)(height)) {
          style += `width:${(0, import_utils.transformSize)(h * ar)};height:${hUnit};`;
        } else {
          style += `height:${hUnit};`;
        }
      } else if (ar) {
        if (!width || (0, import_utils.isCssRelativeSize)(width)) {
          wrapper = true;
          wrapperStyle = `position:relative;height:0;`;
          if (width) {
            const unit = wUnit.replace(/[0-9.]/g, "");
            wrapperStyle += `width:${width};padding-bottom:${(0, import_utils.roundNumber)(
              w / ar,
              5
            )}${unit};`;
          } else {
            wrapperStyle += `width:100%;padding-bottom:${(0, import_utils.roundNumber)(
              100 / ar,
              5
            )}%;`;
          }
        } else {
          style += `width:${wUnit};height:${(0, import_utils.transformSize)(w / ar)};`;
        }
      } else if (width) {
        style += `width:${wUnit};`;
      }
      return { style, wrapper, wrapperStyle };
    });
    const onClick = (e) => emit("click", e);
    return { state, onClick };
  }
});
function __vue_render__(_ctx, _cache) {
  return _ctx.state.wrapper ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 0,
      class: "fan-aspect-ratio",
      style: (0, import_vue2.normalizeStyle)(_ctx.state.wrapperStyle)
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: "fan-aspect-ratio__box",
          style: (0, import_vue2.normalizeStyle)(_ctx.state.style),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      )
    ],
    4
    /* STYLE */
  )) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 1,
      class: "fan-aspect-ratio",
      style: (0, import_vue2.normalizeStyle)(_ctx.state.style),
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ],
    4
    /* STYLE */
  ));
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
