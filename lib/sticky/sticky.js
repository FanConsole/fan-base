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
var import_sticky_sfc = require("./sticky-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_hooks = require("../hooks");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Sticky")[0],
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 99
    },
    /**
     * 一个函数，返回容器对应的 NodesRef 节点，
     * 使用处可以通过 utils.getElementNodes 获取并传入
     */
    container: {
      type: Function
    },
    /**
     * 当前滚动区域的滚动位置，非 null 时会禁用页面滚动事件的监听
     */
    scrollTop: {
      type: Number,
      default: null
    }
  },
  emits: ["change"],
  setup(props, context) {
    const state = (0, import_vue.reactive)({
      width: 0,
      height: 0,
      fixed: false,
      transform: 0
    });
    const uniqueId = (0, import_utils.createUniqueId)({ prefix: "fanSticky" });
    const _this = (0, import_vue.getCurrentInstance)();
    const { onPageScroll } = (0, import_hooks.usePageLifecycle)();
    const selector = "#" + uniqueId;
    const onScroll = () => {
      const { container, offsetTop } = props;
      if (typeof container === "function") {
        Promise.all([
          (0, import_utils.getElementBounding)({ selector, scope: _this }),
          (0, import_utils.getElementBounding)({ el: container() })
        ]).then(([rect, containerRect]) => {
          state.height = rect.height;
          state.width = rect.width;
          state.fixed = offsetTop > rect.top && containerRect.bottom > 0;
          const difference = containerRect.bottom - offsetTop - state.height;
          state.transform = difference < 0 ? difference : 0;
        });
        return;
      }
      (0, import_utils.getElementBounding)({ selector, scope: _this }).then((rect) => {
        if (!rect)
          return;
        if (offsetTop >= rect.top) {
          state.fixed = true;
          state.height = rect.height;
          state.width = rect.width;
        } else {
          state.fixed = false;
        }
      });
    };
    onPageScroll((scrollTop) => {
      if (props.scrollTop != null)
        return;
      onScroll(scrollTop);
    });
    (0, import_vue.watch)(
      () => props.scrollTop,
      (val) => val !== null && onScroll(val),
      { immediate: true }
    );
    (0, import_vue.watch)(
      () => state.fixed,
      (val) => {
        context.emit("change", { fixed: val });
      }
    );
    const wrapperStyle = (0, import_vue.computed)(() => {
      if (!state.fixed)
        return "";
      return `width:${state.width}px;height:${state.height}px;`;
    });
    const theStyle = (0, import_vue.computed)(() => {
      let s = "";
      if (state.transform)
        s += `transform:translate3d(0,${state.transform}px,0);`;
      if (!state.fixed)
        return s;
      const { offsetTop, zIndex } = props;
      s += `width:${state.width}px;height:${state.height}px;top:${offsetTop}px;z-index:${zIndex};`;
      return s;
    });
    return { uniqueId, state, wrapperStyle, theStyle };
  }
});
const _hoisted_1 = ["id"];
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
    id: _ctx.uniqueId,
    style: (0, import_vue2.normalizeStyle)(_ctx.wrapperStyle)
  }, [
    (0, import_vue2.createElementVNode)(
      "div",
      {
        style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
        class: (0, import_vue2.normalizeClass)(["fan-sticky", { "fan-sticky--fixed": _ctx.state.fixed }])
      },
      [
        (0, import_vue2.renderSlot)(_ctx.$slots, "default")
      ],
      6
      /* CLASS, STYLE */
    )
  ], 12, _hoisted_1);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
