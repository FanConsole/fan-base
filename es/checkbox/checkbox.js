import "./checkbox-sfc.css";
import { computed, defineComponent } from "vue";
import FanIcon from "../icon/icon.js";
import { createNamespace, transformSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Checkbox")[0],
  components: { FanIcon },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: "24px"
    },
    color: {
      type: String
    },
    iconColor: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const { color, customStyle } = props;
      let s = "";
      if (color)
        s += `--fan-checkbox-active-color:${color};`;
      return s;
    });
    const iSize = computed(() => transformSize(props.size));
    const toggle = () => {
      const val = !props.modelValue;
      emit("update:modelValue", val);
      emit("change", val);
    };
    return { theStyle, iSize, toggle, iconColor: props.iconColor };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: _normalizeClass(["fan-checkbox", {
        "fan-checkbox--disabled": _ctx.disabled,
        "fan-checkbox--checked": _ctx.modelValue
      }]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggle && _ctx.toggle(...args))
    },
    [
      _createElementVNode(
        "div",
        {
          class: "fan-checkbox__i",
          style: _normalizeStyle({ width: _ctx.iSize, height: _ctx.iSize })
        },
        [
          _createVNode(_component_FanIcon, {
            name: "check",
            size: `calc(${_ctx.iSize} * 0.8)`,
            color: _ctx.disabled ? "#c8c9cc" : _ctx.iconColor ? _ctx.iconColor : "#fff",
            "custom-style": { visibility: _ctx.modelValue ? "visible" : "hidden" }
          }, null, 8, ["size", "color", "custom-style"])
        ],
        4
        /* STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
