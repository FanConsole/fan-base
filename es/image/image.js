import "./image-sfc.css";
import { defineComponent, computed } from "vue";
import { createNamespace, transformSize } from "../utils";
import FanAspectRatio from "../aspect-ratio/aspect-ratio.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Image")[0],
  components: { FanAspectRatio },
  emits: ["click", "load"],
  props: {
    src: String,
    width: [Number, String],
    height: [Number, String],
    aspectRatio: [Number, String],
    mode: {
      type: String,
      default: "",
      validator: (value) => ["", "scaleToFill", "aspectFit", "aspectFill", "widthFix"].includes(
        value
      )
    },
    /**
     * 圆角
     */
    radius: [Number, String],
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // 占位图片风格，是否白底，默认底 #f1f1f1
    placeholderLight: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const radiusStyle = computed(() => {
      return props.radius ? `border-radius:${transformSize(props.radius)};` : "";
    });
    const theStyle = computed(() => {
      return `overflow:hidden;position:relative;${radiusStyle.value}`;
    });
    const aspectRatioNum = computed(
      () => props.mode === "widthFix" ? 0 : props.aspectRatio
    );
    const imgStyle = computed(() => {
      const { height, mode } = props;
      const theAS = aspectRatioNum.value;
      let h = theAS || height ? "100%" : transformSize(height);
      if (theAS || h) {
        const fit = mode === "aspectFill" ? "cover" : mode === "aspectFit" ? "contain" : "";
        return `height:${h};object-fit:${fit};${radiusStyle.value}`;
      }
      return `${radiusStyle.value}`;
    });
    const onClick = (e) => emit("click", e);
    const onLoad = (e) => {
      const { naturalWidth, naturalHeight } = e.target;
      emit("load", {
        detail: { width: naturalWidth, height: naturalHeight }
      });
    };
    return { radiusStyle, theStyle, imgStyle, aspectRatioNum, onClick, onLoad };
  }
});
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDirective as _resolveDirective, withDirectives as _withDirectives, renderSlot as _renderSlot, resolveComponent as _resolveComponent, withCtx as _withCtx, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["src"];
function __vue_render__(_ctx, _cache) {
  const _component_FanAspectRatio = _resolveComponent("FanAspectRatio");
  const _directive_lazy = _resolveDirective("lazy");
  return _openBlock(), _createBlock(_component_FanAspectRatio, {
    style: _normalizeStyle(_ctx.theStyle),
    "aspect-ratio": _ctx.aspectRatioNum,
    width: _ctx.width,
    height: _ctx.height,
    onClick: _ctx.onClick
  }, {
    default: _withCtx(() => [
      !_ctx.src ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          style: _normalizeStyle("height:100%;" + _ctx.radiusStyle),
          class: _normalizeClass(["fan-img--empty", { light: _ctx.placeholderLight }])
        },
        null,
        6
        /* CLASS, STYLE */
      )) : _ctx.lazyLoad ? _withDirectives((_openBlock(), _createElementBlock(
        "img",
        {
          key: 1,
          onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
          style: _normalizeStyle(_ctx.imgStyle),
          class: "fan-img",
          alt: ""
        },
        null,
        36
        /* STYLE, NEED_HYDRATION */
      )), [
        [_directive_lazy, _ctx.src]
      ]) : (_openBlock(), _createElementBlock("img", {
        key: 2,
        onLoad: _cache[1] || (_cache[1] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
        style: _normalizeStyle(_ctx.imgStyle),
        class: "fan-img",
        src: _ctx.src,
        alt: ""
      }, null, 44, _hoisted_1)),
      _renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["style", "aspect-ratio", "width", "height", "onClick"]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
