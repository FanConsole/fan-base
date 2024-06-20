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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_positioned_view_sfc = require("./positioned-view-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("PositionedView")[0],
  props: {
    /**
     * 文档定位方式，同 css 的 position
     */
    type: {
      type: String,
      default: "fixed",
      validator(value) {
        return ["fixed", "absolute", "relative", "static"].includes(value);
      }
    },
    /**
     * 位置的快捷选项，仅在top、bottom、left、right未设置时生效
     */
    position: {
      type: String,
      validator: (value) => ["bottom", "top"].includes(value)
    },
    zIndex: {
      type: [Number, String],
      default: 99
    },
    top: [String, Number],
    bottom: [String, Number],
    left: [String, Number],
    right: [String, Number],
    bg: String,
    // 底部安全区域
    safeBottom: {
      type: Boolean,
      default: void 0
    },
    /**
     * 是否在文档流中标签位置生成一个等高的占位元素
     */
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  expose: ["calcHeight", "height"],
  setup(props) {
    const uniqueId = (0, import_utils.createUniqueId)({ prefix: "fanPositionedView" });
    const height = (0, import_vue.ref)(0);
    const theStyle = (0, import_vue.computed)(() => {
      const { type, left, right, top, bottom, zIndex, position, bg } = props;
      let s = `position:${type};z-index:${zIndex};`;
      if (!left && !right && !top && !bottom) {
        if (position === "bottom")
          s += `bottom:0;left:0;right:0;`;
        if (position === "top")
          s += `top:0;left:0;right:0;`;
      } else {
        left && (s += `left:${(0, import_utils.transformSize)(left)};`);
        right && (s += `right:${(0, import_utils.transformSize)(right)};`);
        top && (s += `top:${(0, import_utils.transformSize)(top)};`);
        bottom && (s += `bottom:${(0, import_utils.transformSize)(bottom)};`);
      }
      bg && (s += `background:${bg};`);
      return s;
    });
    const useSafeBottom = (0, import_vue.computed)(() => {
      const { position, safeBottom } = props;
      if (safeBottom === false)
        return false;
      return safeBottom || position === "bottom";
    });
    const _this = (0, import_vue.getCurrentInstance)();
    const calcHeight = () => __async(this, null, function* () {
      if (!props.placeholder) {
        height.value = 0;
        return;
      }
      const rect = yield (0, import_utils.getElementBounding)({
        selector: "#" + uniqueId,
        scope: _this
      });
      height.value = (rect == null ? void 0 : rect.height) || 0;
    });
    (0, import_vue.onMounted)(() => {
      setTimeout(calcHeight, 0);
    });
    (0, import_vue.watch)(() => props.placeholder, calcHeight);
    return { uniqueId, height, theStyle, useSafeBottom, calcHeight };
  }
});
const _hoisted_1 = { class: "fan-positioned-view" };
const _hoisted_2 = ["id"];
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    (0, import_vue2.createElementVNode)("div", {
      id: _ctx.uniqueId,
      class: (0, import_vue2.normalizeClass)(["fan-positioned-view__in", { "fan-positioned-view--safe": _ctx.useSafeBottom }]),
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
    }, [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ], 14, _hoisted_2),
    _ctx.height ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
      "div",
      {
        key: 0,
        class: "fan-positioned-view__place",
        style: (0, import_vue2.normalizeStyle)({ height: _ctx.height + "px" })
      },
      null,
      4
      /* STYLE */
    )) : (0, import_vue2.createCommentVNode)("v-if", true)
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
