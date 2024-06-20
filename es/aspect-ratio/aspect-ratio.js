import "./aspect-ratio-sfc.css";
import { defineComponent, computed } from "vue";
import {
  createNamespace,
  transformSize,
  isCssRelativeSize,
  getCssSizeValue,
  roundNumber
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("AspectRatio")[0],
  props: {
    /**
     * 盒子宽高比
     * 支持：比值number、a/b、a:b
     * 宽度未知时主要是利用padding的百分比值是相对于包含块（一般是父盒子）的宽度，造出指定比例的容器
     */
    aspectRatio: [Number, String],
    width: [Number, String],
    height: [Number, String]
  },
  emits: ["click"],
  setup(props, { emit }) {
    const resolveAspectRatio = (ar) => {
      if (typeof ar === "string") {
        if (ar.includes("/") || ar.includes(":")) {
          const [a, b] = ar.replace("/", ":").split(":");
          return a / b;
        }
        return Number(ar);
      }
      return ar;
    };
    const state = computed(() => {
      let wrapper = false;
      let wrapperStyle = "";
      let style = "";
      const { aspectRatio, width, height } = props;
      const ar = resolveAspectRatio(aspectRatio);
      const w = getCssSizeValue(width);
      const wUnit = transformSize(width);
      const h = getCssSizeValue(height);
      const hUnit = transformSize(height);
      if (height) {
        if (width) {
          style += `width:${wUnit};height:${hUnit};`;
        } else if (ar && !isCssRelativeSize(height)) {
          style += `width:${transformSize(h * ar)};height:${hUnit};`;
        } else {
          style += `height:${hUnit};`;
        }
      } else if (ar) {
        if (!width || isCssRelativeSize(width)) {
          wrapper = true;
          wrapperStyle = `position:relative;height:0;`;
          if (width) {
            const unit = wUnit.replace(/[0-9.]/g, "");
            wrapperStyle += `width:${width};padding-bottom:${roundNumber(
              w / ar,
              5
            )}${unit};`;
          } else {
            wrapperStyle += `width:100%;padding-bottom:${roundNumber(
              100 / ar,
              5
            )}%;`;
          }
        } else {
          style += `width:${wUnit};height:${transformSize(w / ar)};`;
        }
      } else if (width) {
        style += `width:${wUnit};`;
      }
      return { style, wrapper, wrapperStyle };
    });
    const onClick = (e) => emit("click", e);
    return { state, onClick };
  }
});
import { renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __vue_render__(_ctx, _cache) {
  return _ctx.state.wrapper ? (_openBlock(), _createElementBlock(
    "div",
    {
      key: 0,
      class: "fan-aspect-ratio",
      style: _normalizeStyle(_ctx.state.wrapperStyle)
    },
    [
      _createElementVNode(
        "div",
        {
          class: "fan-aspect-ratio__box",
          style: _normalizeStyle(_ctx.state.style),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      )
    ],
    4
    /* STYLE */
  )) : (_openBlock(), _createElementBlock(
    "div",
    {
      key: 1,
      class: "fan-aspect-ratio",
      style: _normalizeStyle(_ctx.state.style),
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      _renderSlot(_ctx.$slots, "default")
    ],
    4
    /* STYLE */
  ));
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
