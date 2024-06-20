import "./sticky-sfc.css";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  watch
} from "vue";
import {
  createNamespace,
  createUniqueId,
  getElementBounding
} from "../utils";
import { usePageLifecycle } from "../hooks";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Sticky")[0],
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
    const state = reactive({
      width: 0,
      height: 0,
      fixed: false,
      transform: 0
    });
    const uniqueId = createUniqueId({ prefix: "fanSticky" });
    const _this = getCurrentInstance();
    const { onPageScroll } = usePageLifecycle();
    const selector = "#" + uniqueId;
    const onScroll = () => {
      const { container, offsetTop } = props;
      if (typeof container === "function") {
        Promise.all([
          getElementBounding({ selector, scope: _this }),
          getElementBounding({ el: container() })
        ]).then(([rect, containerRect]) => {
          state.height = rect.height;
          state.width = rect.width;
          state.fixed = offsetTop > rect.top && containerRect.bottom > 0;
          const difference = containerRect.bottom - offsetTop - state.height;
          state.transform = difference < 0 ? difference : 0;
        });
        return;
      }
      getElementBounding({ selector, scope: _this }).then((rect) => {
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
    watch(
      () => props.scrollTop,
      (val) => val !== null && onScroll(val),
      { immediate: true }
    );
    watch(
      () => state.fixed,
      (val) => {
        context.emit("change", { fixed: val });
      }
    );
    const wrapperStyle = computed(() => {
      if (!state.fixed)
        return "";
      return `width:${state.width}px;height:${state.height}px;`;
    });
    const theStyle = computed(() => {
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
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["id"];
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    id: _ctx.uniqueId,
    style: _normalizeStyle(_ctx.wrapperStyle)
  }, [
    _createElementVNode(
      "div",
      {
        style: _normalizeStyle(_ctx.theStyle),
        class: _normalizeClass(["fan-sticky", { "fan-sticky--fixed": _ctx.state.fixed }])
      },
      [
        _renderSlot(_ctx.$slots, "default")
      ],
      6
      /* CLASS, STYLE */
    )
  ], 12, _hoisted_1);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
