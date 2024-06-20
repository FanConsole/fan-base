import "./switch-sfc.css";
import { defineComponent, computed, ref, watch } from "vue";
import { createNamespace, transformSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Switch")[0],
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#04BE02"
    },
    size: {
      type: [String, Number],
      default: 30
    }
  },
  setup(props, { emit }) {
    const innerShow = ref(props.modelValue);
    watch(() => props.modelValue, (val) => innerShow.value = val);
    const theStyle = computed(() => {
      const { size, color } = props;
      const s = `font-size: ${transformSize(
        size
      )};--fan-switch--color: ${color};`;
      return s;
    });
    const onClick = () => {
      if (props.disabled)
        return;
      innerShow.value = innerShow.value ? false : true;
      emit("update:modelValue", innerShow.value);
      emit("change", innerShow.value);
    };
    return { innerShow, theStyle, onClick };
  }
});
import { createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "fan-switch__node" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_2 = [
  _hoisted_1
];
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass(["fan-switch", [{ "fan-switch__on": _ctx.innerShow }, { "fan-switch__d": _ctx.disabled }]]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
      style: _normalizeStyle(_ctx.theStyle)
    },
    [..._hoisted_2],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
