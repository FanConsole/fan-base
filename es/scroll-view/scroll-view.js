import "./scroll-view-sfc.css";
import { computed, defineComponent, ref, watch, onMounted } from "vue";
import { createNamespace, transformSize } from "../utils";
import { TransitionPresets, useScroll, useTransition } from "@vueuse/core";
const __vue_sfc__ = defineComponent({
  name: createNamespace("ScrollView")[0],
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
    const theStyle = computed(() => {
      const { width, height, maxHeight, scrollY, scrollX, enableFlex } = props;
      let style = "";
      if (width)
        style += `width:${transformSize(width)};`;
      if (height)
        style += `height:${transformSize(height)};`;
      if (maxHeight)
        style += `max-height:${transformSize(maxHeight)};`;
      if (scrollX)
        style += `white-space:nowrap;`;
      style += `overflow-x:${scrollX ? "auto" : "hidden"};overflow-y:${scrollY ? "auto" : "hidden"};`;
      if (enableFlex)
        style += "display:flex;";
      return style;
    });
    const el = ref(null);
    const scrollPositionSource = ref([0, 0]);
    const scrollPosition = useTransition(scrollPositionSource, {
      delay: 0,
      duration: 290,
      disabled: !props.scrollWithAnimation,
      transition: TransitionPresets.linear
    });
    const setScrollPosition = ([left, top]) => {
      if (!el.value)
        return;
      el.value.scrollLeft = left;
      el.value.scrollTop = top;
    };
    watch(scrollPosition, setScrollPosition);
    watch(
      () => props.scrollLeft,
      (val) => {
        scrollPositionSource.value = [val, scrollPositionSource.value[1]];
      }
    );
    watch(
      () => props.scrollTop,
      (val) => {
        scrollPositionSource.value = [scrollPositionSource.value[0], val];
      }
    );
    onMounted(() => {
      scrollPositionSource.value = [
        props.scrollLeft || 0,
        props.scrollTop || 0
      ];
    });
    const { x, y, arrivedState } = useScroll(el, {
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
    watch(arrivedState, ({ left, right, top, bottom }) => {
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
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "fan-scroll-view--flex"
};
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "el",
      class: "fan-scroll-view",
      style: _normalizeStyle(_ctx.theStyle)
    },
    [
      _ctx.enableFlex && _ctx.scrollX && _ctx.scrollable ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
        _renderSlot(_ctx.$slots, "default")
      ])) : _renderSlot(_ctx.$slots, "default", { key: 1 })
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
