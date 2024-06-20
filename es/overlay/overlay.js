import "./overlay-sfc.css";
import { defineComponent, watch, ref, computed } from "vue";
import { createNamespace } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Overlay")[0],
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    zIndex: {
      type: [String, Number],
      default: 1
    },
    duration: {
      type: [String, Number],
      default: 0.3
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const { zIndex, duration } = props;
      return `z-index:${zIndex};--fan-overlay-time:${duration}s;`;
    });
    const isShow = ref(props.show);
    const className = ref("");
    const enter = (show) => {
      className.value = "fan-overlay-enter-active";
      isShow.value = show;
      setTimeout(() => {
        className.value = "";
      }, props.duration * 1e3);
    };
    const leave = (show) => {
      className.value = "fan-overlay-leave-active";
      setTimeout(() => {
        isShow.value = show;
        className.value = "";
      }, props.duration * 1e3);
    };
    const close = () => {
      emit("click");
    };
    watch(
      () => props.show,
      (val, old) => {
        if (val === old)
          return;
        val ? enter(val) : leave(val);
      }
    );
    const fn = () => null;
    return { isShow, theStyle, className, close, fn };
  }
});
import { renderSlot as _renderSlot, withModifiers as _withModifiers, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue";
function __vue_render__(_ctx, _cache) {
  return _ctx.isShow ? (_openBlock(), _createElementBlock(
    "div",
    {
      key: 0,
      class: _normalizeClass(["fan-overlay", _ctx.className]),
      style: _normalizeStyle(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
      onTouchmove: _cache[1] || (_cache[1] = _withModifiers((...args) => _ctx.fn && _ctx.fn(...args), ["prevent", "stop"]))
    },
    [
      _renderSlot(_ctx.$slots, "default")
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  )) : _createCommentVNode("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
