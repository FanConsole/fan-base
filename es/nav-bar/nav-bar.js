import "./nav-bar-sfc.css";
import { computed, defineComponent } from "vue";
import FanIcon from "../icon/icon.js";
import {
  createNamespace,
  getSystemInfo,
  transformSize
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("NavBar")[0],
  components: { FanIcon },
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
    const { navBarHeight, statusBarHeight } = getSystemInfo();
    const wrapperStyle = computed(() => {
      const { fgColor, height } = props;
      const titleHeight = !height ? navBarHeight - statusBarHeight + "px" : transformSize(height);
      let s = `--fan-title-bar-height:${titleHeight};--fan-status-bar-height:${statusBarHeight}px;`;
      if (fgColor)
        s += `--fan-nav-bar-fg-color:${fgColor};`;
      return s;
    });
    const theStyle = computed(() => {
      const { bg, zIndex, fontSize } = props;
      let s = `z-index:${zIndex};`;
      if (fontSize)
        s += `font-size:${transformSize(fontSize)};`;
      if (bg)
        s += `background:${bg};`;
      return s;
    });
    const statusBarStyle = computed(() => {
      return props.statusBarColor ? `background:${props.statusBarColor};` : "";
    });
    const placeholderStyle = computed(() => {
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
import { normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createBlock as _createBlock, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, renderSlot as _renderSlot, normalizeClass as _normalizeClass } from "vue";
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
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: "fan-nav-bar-wrap",
      style: _normalizeStyle(_ctx.wrapperStyle)
    },
    [
      _ctx.fixed ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          style: _normalizeStyle(_ctx.placeholderStyle),
          class: "fan-nav-bar__place"
        },
        null,
        4
        /* STYLE */
      )) : _createCommentVNode("v-if", true),
      _createElementVNode(
        "div",
        {
          style: _normalizeStyle(_ctx.theStyle),
          class: _normalizeClass(["fan-nav-bar", { "fan-nav-bar--fixed": _ctx.fixed, "fan-hairline--bottom": _ctx.border }])
        },
        [
          _ctx.statusBar ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              style: _normalizeStyle(_ctx.statusBarStyle),
              class: "fan-nav-status-bar"
            },
            null,
            4
            /* STYLE */
          )) : _createCommentVNode("v-if", true),
          _ctx.titleBar ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
            _createElementVNode("div", _hoisted_2, [
              _ctx.back ? (_openBlock(), _createBlock(_component_FanIcon, {
                key: 0,
                name: _ctx.backIcon,
                size: 18,
                style: { "padding": "8px 16px" },
                onClick: _ctx.backClick
              }, null, 8, ["name", "onClick"])) : _createCommentVNode("v-if", true)
            ]),
            _ctx.title ? (_openBlock(), _createElementBlock(
              "div",
              _hoisted_3,
              _toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            _renderSlot(_ctx.$slots, "default"),
            _createElementVNode("div", _hoisted_4, [
              _renderSlot(_ctx.$slots, "right")
            ])
          ])) : _createCommentVNode("v-if", true)
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
export {
  stdin_default as default
};
