import "./empty-sfc.css";
import { defineComponent, computed } from "vue";
import { createNamespace, transformSize, transformStyleSize } from "../utils";
import FanImage from "../image/image.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Empoty")[0],
  components: {
    FanImage
  },
  props: {
    image: {
      type: String,
      default: "https://img.dac6.cn/fre/saas/empty-box.png"
    },
    imageSize: {
      type: [Number, String, Array],
      default: 100
    },
    descSize: {
      type: [Number, String]
    },
    description: {
      type: String,
      default: "\u6682\u65E0\u5185\u5BB9"
    },
    // 是否识别 \n 等
    pre: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const inageStyle = computed(() => {
      let style = props.imageSize;
      if (!Array.isArray(props.imageSize))
        style = [props.imageSize, props.imageSize];
      return style;
    });
    const theStyle = computed(() => {
      const { customStyle, descSize } = props;
      const s = descSize ? `font-size:${transformSize(descSize)}` : "";
      return transformStyleSize(customStyle) + s;
    });
    return {
      theStyle,
      inageStyle
    };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = { class: "fan-empty__bottom" };
function __vue_render__(_ctx, _cache) {
  const _component_FanImage = _resolveComponent("FanImage");
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: "fan-empty"
    },
    [
      _createVNode(_component_FanImage, {
        src: _ctx.image,
        width: _ctx.inageStyle[0],
        height: _ctx.inageStyle[1]
      }, null, 8, ["src", "width", "height"]),
      _ctx.description ? (_openBlock(), _createElementBlock(
        "p",
        {
          key: 0,
          class: _normalizeClass(["fan-empty__desc", { pre: _ctx.pre }])
        },
        _toDisplayString(_ctx.description),
        3
        /* TEXT, CLASS */
      )) : _createCommentVNode("v-if", true),
      _createElementVNode("div", _hoisted_1, [
        _renderSlot(_ctx.$slots, "default")
      ])
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
