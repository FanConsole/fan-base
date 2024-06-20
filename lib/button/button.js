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
var import_button_sfc = require("./button-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_loading = __toESM(require("../loading/loading.js"));
var import_icon = __toESM(require("../icon/icon.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Button")[0],
  components: {
    FanLoading: import_loading.default,
    FanIcon: import_icon.default
  },
  emits: ["click"],
  props: {
    color: String,
    background: String,
    // 将废弃⚠️
    bg: String,
    width: String,
    height: String,
    margin: String,
    padding: String,
    flex1: {
      type: Boolean,
      default: false
    },
    textSize: {
      type: [String, Number]
    },
    textColor: String,
    bold: [Boolean, Number, String],
    /**
     * 图标或图片链接，同 Icon 组件的 name属性
     */
    icon: String,
    /**
     * 图标/loading的大小
     * @default textSize
     */
    iconSize: [String, Number],
    iconPosition: {
      type: String,
      validator: (value) => ["left", "right"].includes(value),
      default: "left"
    },
    // 图标与文字的间距
    iconPad: [String, Number],
    /**
     * 是否为块级元素
     */
    block: {
      type: Boolean,
      default: false
    },
    /**
     * 是否为朴素按钮
     */
    plain: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有边框，plain朴素按钮时生效
     */
    border: {
      type: [Boolean, String],
      default: true
    },
    round: {
      type: Boolean,
      default: false
    },
    /**
     * 圆角
     */
    radius: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否使用 0.5px 边框
     */
    hairline: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String,
    // 同 Loading 组件的 type属性
    loadingType: String
  },
  setup(props, context) {
    const theStyle = (0, import_vue.computed)(() => {
      const {
        color,
        bg: _bg,
        background,
        plain,
        textSize,
        textColor,
        bold,
        round,
        radius,
        iconPad
      } = props;
      const obj = {};
      ["width", "height", "padding", "margin"].forEach(
        (k) => props[k] && (obj[k] = props[k])
      );
      const bg = _bg || background || (plain ? "transparent" : color);
      if (bg)
        obj["--fan-btn-bg"] = bg;
      const c = textColor || (plain ? color || "var(--fan-primary-color)" : !color ? "" : "white");
      if (c)
        obj["--fan-btn-text-color"] = c;
      if (!(0, import_utils.isCssRelativeSize)(textSize) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(textSize, 10) / 12;
        if (zoom < 1)
          obj["zoom"] = zoom;
      }
      if (textSize)
        obj.fontSize = (0, import_utils.transformSize)(textSize);
      if (iconPad)
        obj["--fan-btn-icon-pad"] = (0, import_utils.transformSize)(iconPad);
      if (typeof bold === "number" || typeof bold === "string" && Number(bold) >= 100) {
        obj.fontWeight = bold;
      }
      if (plain && color)
        obj["--fan-btn-border-color"] = color;
      if (radius || radius === 0)
        obj["--fan-btn-border-radius"] = radius;
      else if (round)
        obj["--fan-btn-border-radius"] = "var(--fan-radius-max)";
      return (0, import_utils.transformStyleSize)(obj);
    });
    const theIconSize = (0, import_vue.computed)(() => {
      return props.iconSize || props.textSize;
    });
    const theIconPosition = (0, import_vue.computed)(() => {
      const { icon, iconPosition, loading } = props;
      if (loading)
        return "left";
      if (!icon)
        return "none";
      return iconPosition;
    });
    const showText = (0, import_vue.computed)(() => {
      const { loading, loadingText } = props;
      return !loading || !loadingText;
    });
    const onClick = (e) => {
      context.emit("click", e);
    };
    return { theStyle, theIconSize, theIconPosition, showText, onClick };
  }
});
const _hoisted_1 = ["disabled"];
const _hoisted_2 = {
  key: 0,
  class: "fan-btn__hairline"
};
function __vue_render__(_ctx, _cache) {
  const _component_FanLoading = (0, import_vue2.resolveComponent)("FanLoading");
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("button", {
    class: (0, import_vue2.normalizeClass)(["fan-btn", {
      "fan-btn--f1": _ctx.flex1,
      "fan-btn--block": _ctx.block,
      "fan-btn--disabled": _ctx.disabled,
      "fan-btn--noborder": !_ctx.border,
      "fan-btn--hairline": _ctx.hairline,
      "fan-btn--plain": _ctx.plain,
      "fan-btn--bold": _ctx.bold
    }]),
    "hover-class": "none",
    style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    _ctx.hairline ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_2)) : (0, import_vue2.createCommentVNode)("v-if", true),
    _ctx.loading ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanLoading, {
      key: 1,
      color: "currentColor",
      type: _ctx.loadingType,
      size: _ctx.theIconSize,
      "text-size": _ctx.textSize,
      "text-color": "inherit"
    }, {
      default: (0, import_vue2.withCtx)(() => [
        (0, import_vue2.createTextVNode)(
          (0, import_vue2.toDisplayString)(_ctx.loadingText),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["type", "size", "text-size"])) : (0, import_vue2.createCommentVNode)("v-if", true),
    _ctx.theIconPosition === "left" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
      key: 2,
      name: _ctx.icon,
      color: "currentColor",
      size: _ctx.theIconSize
    }, null, 8, ["name", "size"])) : (0, import_vue2.createCommentVNode)("v-if", true),
    _ctx.showText ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
      "div",
      {
        key: 3,
        class: (0, import_vue2.normalizeClass)(["fan-btn__in", [`fan-btn--i${_ctx.theIconPosition}`]])
      },
      [
        (0, import_vue2.renderSlot)(_ctx.$slots, "default")
      ],
      2
      /* CLASS */
    )) : (0, import_vue2.createCommentVNode)("v-if", true),
    _ctx.theIconPosition === "right" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
      key: 4,
      name: _ctx.icon,
      color: "currentColor",
      size: _ctx.theIconSize
    }, null, 8, ["name", "size"])) : (0, import_vue2.createCommentVNode)("v-if", true)
  ], 14, _hoisted_1);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
