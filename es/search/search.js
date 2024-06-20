import "./search-sfc.css";
import { defineComponent, computed, ref, watch } from "vue";
import { createNamespace, transformStyleSize, transformSize } from "../utils";
import FanIcon from "../icon/icon.js";
import FanButton from "../button/button.js";
import FanInput from "../input/input.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Search")[0],
  components: { FanIcon, FanButton, FanInput },
  emits: ["blur", "focus", "click", "search", "input", "update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: String,
    prefixIcon: Boolean,
    readonly: {
      type: Boolean,
      default: false
    },
    bg: String,
    radius: {
      type: String,
      default: "20px"
    },
    icon: String,
    iconStyle: [String, Object],
    innerStyle: String,
    btnStyle: [String, Object]
  },
  setup(props, { emit }) {
    const inputBoxStyle = computed(() => {
      const { bg, radius, innerStyle } = props;
      let style = "";
      if (bg)
        style += `background-color:${bg};`;
      if (radius)
        style += `border-radius:${transformSize(radius)};`;
      return transformStyleSize(style) + transformStyleSize(innerStyle);
    });
    const btnBoxStyle = computed(() => transformStyleSize(props.btnStyle));
    const innerValue = ref(props.modelValue);
    watch(innerValue, (val) => {
      if (val !== props.modelValue) {
        emit("update:modelValue", innerValue.value);
        emit("input", val);
      }
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      }
    );
    const onBlur = (e) => emit("blur", e);
    const onFocus = (e) => emit("focus", e);
    const onInput = (val) => emit("input", val);
    const onConfirm = (val) => emit("search", val);
    const onClick = () => emit("click");
    return {
      btnBoxStyle,
      inputBoxStyle,
      innerValue,
      onBlur,
      onFocus,
      onInput,
      onClick,
      onConfirm
    };
  }
});
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createVNode as _createVNode, normalizeStyle as _normalizeStyle, createTextVNode as _createTextVNode, withCtx as _withCtx, createElementVNode as _createElementVNode, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = { class: "fan-search" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  const _component_FanInput = _resolveComponent("FanInput");
  const _component_FanButton = _resolveComponent("FanButton");
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode(
      "div",
      {
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
        class: "fan-search__inner",
        style: _normalizeStyle(_ctx.inputBoxStyle)
      },
      [
        _ctx.prefixIcon ? (_openBlock(), _createBlock(_component_FanIcon, {
          key: 0,
          name: "search",
          color: "#999",
          size: 14,
          style: { marginRight: "3px" }
        })) : _createCommentVNode("v-if", true),
        _createVNode(_component_FanInput, {
          modelValue: _ctx.innerValue,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.innerValue = $event),
          class: "fan-flex-1",
          style: { padding: "0 4px 0 0" },
          placeholder: _ctx.placeholder || "\u641C\u4E00\u641C",
          readonly: _ctx.readonly,
          clearable: "",
          onBlur: _ctx.onBlur,
          onFocus: _ctx.onFocus,
          onInput: _ctx.onInput,
          onConfirm: _ctx.onConfirm
        }, null, 8, ["modelValue", "placeholder", "readonly", "onBlur", "onFocus", "onInput", "onConfirm"]),
        _ctx.icon ? (_openBlock(), _createBlock(_component_FanIcon, {
          key: 1,
          name: _ctx.icon,
          style: _normalizeStyle(_ctx.iconStyle),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.onConfirm(_ctx.innerValue))
        }, null, 8, ["name", "style"])) : (_openBlock(), _createBlock(_component_FanButton, {
          key: 2,
          style: _normalizeStyle(_ctx.btnBoxStyle),
          round: "",
          radius: _ctx.radius,
          width: "70px",
          height: "100%",
          onClick: _cache[2] || (_cache[2] = ($event) => _ctx.onConfirm(_ctx.innerValue))
        }, {
          default: _withCtx(() => [
            _createTextVNode("\u641C\u7D22")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["style", "radius"]))
      ],
      4
      /* STYLE */
    )
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
