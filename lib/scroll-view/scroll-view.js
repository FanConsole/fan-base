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
var import_scroll_view_sfc = require("./scroll-view-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_core = require("@vueuse/core");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("ScrollView")[0],
  emits: ["scrolltoupper", "scrolltolower", "scroll"],
  props: {
    width: [Number, String],
    height: [Number, String],
    maxHeight: [Number, String],
    scrollY: {
      type: [Boolean, String],
      default: false
    },
    scrollX: {
      type: [Boolean, String],
      default: false
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
     */
    upperThreshold: {
      type: [Number, String],
      default: 50
    },
    /**
     * 距底部/右边多远时（单位px），触发 scrolltolower 事件
     */
    lowerThreshold: {
      type: [Number, String],
      default: 50
    },
    /**
     * 设置竖向滚动条位置
     */
    scrollTop: [Number, String],
    /**
     * 设置横向滚动条位置
     */
    scrollLeft: [Number, String],
    scrollWithAnimation: {
      type: [Boolean, String],
      default: false
    },
    /**
     * iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
     * @description 仅 app-nvue，微信小程序
     */
    enableBackToTop: {
      type: [Number, String],
      default: 50
    },
    /**
     * 启用 flexbox 布局。开启后，当前节点声明了 display: flex 就会成为 flex container，并作用于其孩子节点
     */
    enableFlex: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props, context) {
    const theStyle = (0, import_vue.computed)(() => {
      const { width, height, maxHeight, scrollY, scrollX, enableFlex } = props;
      let style = "";
      if (width)
        style += `width:${(0, import_utils.transformSize)(width)};`;
      if (height)
        style += `height:${(0, import_utils.transformSize)(height)};`;
      if (maxHeight)
        style += `max-height:${(0, import_utils.transformSize)(maxHeight)};`;
      if (scrollX)
        style += `white-space:nowrap;`;
      style += `overflow-x:${scrollX ? "auto" : "hidden"};overflow-y:${scrollY ? "auto" : "hidden"};`;
      if (enableFlex)
        style += "display:flex;";
      return style;
    });
    const el = (0, import_vue.ref)(null);
    const scrollPositionSource = (0, import_vue.ref)([0, 0]);
    const scrollPosition = (0, import_core.useTransition)(scrollPositionSource, {
      delay: 0,
      duration: 290,
      disabled: !props.scrollWithAnimation,
      transition: import_core.TransitionPresets.linear
    });
    const setScrollPosition = ([left, top]) => {
      if (!el.value)
        return;
      el.value.scrollLeft = left;
      el.value.scrollTop = top;
    };
    (0, import_vue.watch)(scrollPosition, setScrollPosition);
    (0, import_vue.watch)(
      () => props.scrollLeft,
      (val) => {
        scrollPositionSource.value = [val, scrollPositionSource.value[1]];
      }
    );
    (0, import_vue.watch)(
      () => props.scrollTop,
      (val) => {
        scrollPositionSource.value = [scrollPositionSource.value[0], val];
      }
    );
    (0, import_vue.onMounted)(() => {
      scrollPositionSource.value = [
        props.scrollLeft || 0,
        props.scrollTop || 0
      ];
    });
    const { x, y, arrivedState } = (0, import_core.useScroll)(el, {
      offset: {
        right: props.lowerThreshold,
        bottom: props.lowerThreshold,
        left: props.upperThreshold,
        top: props.upperThreshold
      },
      onScroll: () => {
        context.emit("scroll", {
          detail: { scrollLeft: x.value, scrollTop: y.value }
        });
      }
    });
    (0, import_vue.watch)(arrivedState, ({ left, right, top, bottom }) => {
      const { scrollY, scrollX } = props;
      if (scrollY) {
        if (bottom)
          context.emit("scrolltolower");
        if (top)
          context.emit("scrolltoupper");
      }
      if (scrollX) {
        if (right)
          context.emit("scrolltolower");
        if (left)
          context.emit("scrolltoupper");
      }
    });
    return { theStyle, el };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "fan-scroll-view--flex"
};
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      ref: "el",
      class: "fan-scroll-view",
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
    },
    [
      _ctx.enableFlex && _ctx.scrollX && _ctx.scrollable ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
        (0, import_vue2.renderSlot)(_ctx.$slots, "default")
      ])) : (0, import_vue2.renderSlot)(_ctx.$slots, "default", { key: 1 })
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
