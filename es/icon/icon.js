import "./icon-sfc.css";
import { defineComponent, computed } from "vue";
import { createNamespace, transformSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Icon")[0],
  emits: ["click"],
  props: {
    /**
     * 图标名称或图片链接
     */
    name: String,
    size: {
      type: [String, Number],
      default: "inherit"
    },
    // css 属性
    verticalAlign: String,
    /**
     * 图标颜色：red，支持渐变：linear-gradient(to right, red, blue)
     */
    color: {
      type: [String, Number],
      default: "inherit"
    }
  },
  setup(props, { emit }) {
    const imgIcon = computed(() => {
      var _a;
      return (_a = props.name) == null ? void 0 : _a.includes("/");
    });
    const theStyle = computed(() => {
      const { name, color, size, verticalAlign } = props;
      const fsize = transformSize(size === "inherit" ? "14px" : size);
      let str = "";
      if (verticalAlign) {
        str += `--fan-icon-align-v:${verticalAlign};`;
      }
      if (imgIcon.value) {
        str += `width:${fsize};height:${fsize};`;
        if (color && color !== "inherit") {
          str += `-webkit-mask-image:url(${name});mask-image:url(${name});
						-webkit-mask-size:cover;mask-size:cover;
						background:${color};`;
        } else {
          str += `background:url(${name}) center / cover no-repeat;`;
        }
      } else {
        str += `font-size:${fsize};`;
        if (color == null ? void 0 : color.includes("-gradient")) {
          str += `color:transparent;background-image:${color};`;
        } else {
          str += `color:${color};`;
        }
      }
      return str;
    });
    const onClick = (e) => {
      emit("click", e);
    };
    return { imgIcon, theStyle, onClick };
  }
});
import { normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass } from "vue";
function __vue_render__(_ctx, _cache) {
  return _ctx.imgIcon ? (_openBlock(), _createElementBlock(
    "div",
    {
      key: 0,
      style: _normalizeStyle(_ctx.theStyle),
      class: "fan-icon--img",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    null,
    4
    /* STYLE */
  )) : (_openBlock(), _createElementBlock(
    "div",
    {
      key: 1,
      style: _normalizeStyle(_ctx.theStyle),
      class: _normalizeClass(["fan-icon", "icon-" + _ctx.name]),
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    null,
    6
    /* CLASS, STYLE */
  ));
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
