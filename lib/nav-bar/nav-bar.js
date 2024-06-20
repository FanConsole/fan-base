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
var import_nav_bar_sfc = require("./nav-bar-sfc.css");
var import_vue = require("vue");
var import_icon = __toESM(require("../icon/icon.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("NavBar")[0],
  components: { FanIcon: import_icon.default },
  props: {
    /**
     * 导航栏背景，默认主题色-导航背景色
     */
    bg: String,
    /**
     * 导航文字颜色，默认主题色-前景色
     */
    fgColor: String,
    /**
     * 是否展示返回图标按钮
     */
    back: {
      type: Boolean,
      default: true
    },
    /**
     * 点击返回图标按钮时是否自动触发返回导航
     */
    autoBack: {
      type: Boolean,
      default: true
    },
    backIcon: {
      type: String,
      default: "left"
    },
    /**
     * 是否展示状态栏高度，状态栏相关设置仅对非H5生效
     */
    statusBar: {
      type: Boolean,
      default: true
    },
    statusBarColor: String,
    /**
     * 是否展示标题栏
     */
    titleBar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    /**
     * 标题字体大小，默认16PX
     */
    fontSize: [String, Number],
    /**
     * 标题栏高度，默认 utils.getSystemInfo()——navBarHeight-statusBarHeight + 'PX'
     */
    height: [String, Number],
    /**
     * 是否固定在顶部
     */
    fixed: {
      type: Boolean,
      default: true
    },
    /**
     * 固定在顶部时是否开启占位
     */
    placeholder: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 90
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  emits: ["back"],
  setup(props, context) {
    const { navBarHeight, statusBarHeight } = (0, import_utils.getSystemInfo)();
    const wrapperStyle = (0, import_vue.computed)(() => {
      const { fgColor, height } = props;
      const titleHeight = !height ? navBarHeight - statusBarHeight + "px" : (0, import_utils.transformSize)(height);
      let s = `--fan-title-bar-height:${titleHeight};--fan-status-bar-height:${statusBarHeight}px;`;
      if (fgColor)
        s += `--fan-nav-bar-fg-color:${fgColor};`;
      return s;
    });
    const theStyle = (0, import_vue.computed)(() => {
      const { bg, zIndex, fontSize } = props;
      let s = `z-index:${zIndex};`;
      if (fontSize)
        s += `font-size:${(0, import_utils.transformSize)(fontSize)};`;
      if (bg)
        s += `background:${bg};`;
      return s;
    });
    const statusBarStyle = (0, import_vue.computed)(() => {
      return props.statusBarColor ? `background:${props.statusBarColor};` : "";
    });
    const placeholderStyle = (0, import_vue.computed)(() => {
      const { statusBar, titleBar, fixed } = props;
      if (!fixed)
        return "";
      let h = "0";
      if (statusBar && titleBar)
        h = "calc(var(--fan-status-bar-height) + var(--fan-title-bar-height))";
      else if (statusBar)
        h = "var(--fan-status-bar-height)";
      else if (titleBar)
        h = "var(--fan-title-bar-height)";
      return `height:${h};`;
    });
    const backClick = () => context.emit("back");
    return {
      wrapperStyle,
      theStyle,
      statusBarStyle,
      placeholderStyle,
      backClick
    };
  }
});
const _hoisted_1 = {
  key: 1,
  class: "fan-nav-title-bar"
};
const _hoisted_2 = { class: "fan-nav-bar__l" };
const _hoisted_3 = {
  key: 0,
  class: "fan-ellipsis fan-nav-bar__title"
};
const _hoisted_4 = { class: "fan-nav-bar__r" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: "fan-nav-bar-wrap",
      style: (0, import_vue2.normalizeStyle)(_ctx.wrapperStyle)
    },
    [
      _ctx.fixed ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 0,
          style: (0, import_vue2.normalizeStyle)(_ctx.placeholderStyle),
          class: "fan-nav-bar__place"
        },
        null,
        4
        /* STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      (0, import_vue2.createElementVNode)(
        "div",
        {
          style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
          class: (0, import_vue2.normalizeClass)(["fan-nav-bar", { "fan-nav-bar--fixed": _ctx.fixed, "fan-hairline--bottom": _ctx.border }])
        },
        [
          _ctx.statusBar ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "div",
            {
              key: 0,
              style: (0, import_vue2.normalizeStyle)(_ctx.statusBarStyle),
              class: "fan-nav-status-bar"
            },
            null,
            4
            /* STYLE */
          )) : (0, import_vue2.createCommentVNode)("v-if", true),
          _ctx.titleBar ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
            (0, import_vue2.createElementVNode)("div", _hoisted_2, [
              _ctx.back ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
                key: 0,
                name: _ctx.backIcon,
                size: 18,
                style: { "padding": "8px 16px" },
                onClick: _ctx.backClick
              }, null, 8, ["name", "onClick"])) : (0, import_vue2.createCommentVNode)("v-if", true)
            ]),
            _ctx.title ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
              "div",
              _hoisted_3,
              (0, import_vue2.toDisplayString)(_ctx.title),
              1
              /* TEXT */
            )) : (0, import_vue2.createCommentVNode)("v-if", true),
            (0, import_vue2.renderSlot)(_ctx.$slots, "default"),
            (0, import_vue2.createElementVNode)("div", _hoisted_4, [
              (0, import_vue2.renderSlot)(_ctx.$slots, "right")
            ])
          ])) : (0, import_vue2.createCommentVNode)("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
