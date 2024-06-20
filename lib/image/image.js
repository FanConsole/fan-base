var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_image_sfc = require("./image-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_aspect_ratio = __toESM(require("../aspect-ratio/aspect-ratio.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Image")[0],
  components: { FanAspectRatio: import_aspect_ratio.default },
  emits: ["click", "load"],
  props: {
    src: String,
    width: [Number, String],
    height: [Number, String],
    aspectRatio: [Number, String],
    mode: {
      type: String,
      default: "",
      validator: (value) => ["", "scaleToFill", "aspectFit", "aspectFill", "widthFix"].includes(
        value
      )
    },
    /**
     * 圆角
     */
    radius: [Number, String],
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // 占位图片风格，是否白底，默认底 #f1f1f1
    placeholderLight: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const radiusStyle = (0, import_vue.computed)(() => {
      return props.radius ? `border-radius:${(0, import_utils.transformSize)(props.radius)};` : "";
    });
    const theStyle = (0, import_vue.computed)(() => {
      return `overflow:hidden;position:relative;${radiusStyle.value}`;
    });
    const aspectRatioNum = (0, import_vue.computed)(
      () => props.mode === "widthFix" ? 0 : props.aspectRatio
    );
    const imgStyle = (0, import_vue.computed)(() => {
      const { height, mode } = props;
      const theAS = aspectRatioNum.value;
      let h = theAS || height ? "100%" : (0, import_utils.transformSize)(height);
      if (theAS || h) {
        const fit = mode === "aspectFill" ? "cover" : mode === "aspectFit" ? "contain" : "";
        return `height:${h};object-fit:${fit};${radiusStyle.value}`;
      }
      return `${radiusStyle.value}`;
    });
    const onClick = (e) => emit("click", e);
    const onLoad = (e) => {
      const { naturalWidth, naturalHeight } = e.target;
      emit("load", {
        detail: { width: naturalWidth, height: naturalHeight }
      });
    };
    return { radiusStyle, theStyle, imgStyle, aspectRatioNum, onClick, onLoad };
  }
});
const _hoisted_1 = ["src"];
function __vue_render__(_ctx, _cache) {
  const _component_FanAspectRatio = (0, import_vue2.resolveComponent)("FanAspectRatio");
  const _directive_lazy = (0, import_vue2.resolveDirective)("lazy");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanAspectRatio, {
    style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
    "aspect-ratio": _ctx.aspectRatioNum,
    width: _ctx.width,
    height: _ctx.height,
    onClick: _ctx.onClick
  }, {
    default: (0, import_vue2.withCtx)(() => [
      !_ctx.src ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 0,
          style: (0, import_vue2.normalizeStyle)("height:100%;" + _ctx.radiusStyle),
          class: (0, import_vue2.normalizeClass)(["fan-img--empty", { light: _ctx.placeholderLight }])
        },
        null,
        6
        /* CLASS, STYLE */
      )) : _ctx.lazyLoad ? (0, import_vue2.withDirectives)(((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "img",
        {
          key: 1,
          onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
          style: (0, import_vue2.normalizeStyle)(_ctx.imgStyle),
          class: "fan-img",
          alt: ""
        },
        null,
        36
        /* STYLE, NEED_HYDRATION */
      )), [
        [_directive_lazy, _ctx.src]
      ]) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("img", {
        key: 2,
        onLoad: _cache[1] || (_cache[1] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
        style: (0, import_vue2.normalizeStyle)(_ctx.imgStyle),
        class: "fan-img",
        src: _ctx.src,
        alt: ""
      }, null, 44, _hoisted_1)),
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["style", "aspect-ratio", "width", "height", "onClick"]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
