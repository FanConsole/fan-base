import "./input-sfc.css";
import { computed, defineComponent, ref, watch } from "vue";
import FanIcon from "../icon/icon.js";
import { createNamespace, transformStyleSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Input")[0],
  components: { FanIcon },
  props: {
    readonly: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    prefixIcon: String,
    prefixColor: {
      type: String,
      default: "var(--fan-black-2)"
    },
    prefixSize: {
      type: [String, Number],
      default: 17
    },
    suffixIcon: String,
    suffixColor: {
      type: String,
      default: "var(--fan-black-2)"
    },
    suffixSize: {
      type: [String, Number],
      default: 17
    },
    // TODO: 小程序特有属性渐进增强
    type: {
      type: String,
      default: "text"
    },
    inputStyle: String,
    placeholder: String,
    autofocus: Boolean,
    placeholderColor: {
      type: String,
      default: "#C4C7CC"
    },
    clearable: {
      type: [Boolean, String],
      default: false
    },
    label: String,
    labelStyle: String,
    border: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: [
    "update:modelValue",
    "input",
    "change",
    "confirm",
    "blur",
    "focus",
    "clear"
  ],
  setup(props, context) {
    const theStyle = computed(
      () => `--fan-input-placeholder-color:${props.placeholderColor};`
    );
    const inStyle = computed(() => transformStyleSize(props.inputStyle));
    const labStyle = computed(() => transformStyleSize(props.labelStyle));
    const innerValue = ref("");
    watch(innerValue, (val) => {
      if (val !== props.modelValue)
        context.emit("update:modelValue", val);
      context.emit("input", val);
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    const handleInput = (e) => {
      innerValue.value = e.target.value;
    };
    const handleChange = (e) => {
      context.emit(e, innerValue.value);
    };
    const onClear = () => {
      innerValue.value = "";
      context.emit("clear", "");
    };
    const focused = ref(false);
    const onFocus = (e) => {
      focused.value = true;
      context.emit("focus", e);
    };
    const onBlur = (e) => {
      setTimeout(() => {
        focused.value = false;
      }, 100);
      context.emit("blur", e);
    };
    return {
      theStyle,
      inStyle,
      labStyle,
      innerValue,
      focused,
      handleChange,
      handleInput,
      onClear,
      onFocus,
      onBlur
    };
  }
});
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createElementBlock as _createElementBlock, withKeys as _withKeys, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = ["type", "value", "readonly", "disabled", "autofocus", "placeholder", "placeholder-style"];
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: _normalizeClass(["fan-input__wrap", { "fan-hairline--bottom": _ctx.border }])
    },
    [
      _ctx.prefixIcon ? (_openBlock(), _createBlock(_component_FanIcon, {
        key: 0,
        name: _ctx.prefixIcon,
        color: _ctx.prefixColor,
        size: _ctx.prefixSize,
        style: { "margin-right": "4px" }
      }, null, 8, ["name", "color", "size"])) : _createCommentVNode("v-if", true),
      _ctx.label ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 1,
          style: _normalizeStyle(_ctx.labStyle),
          class: "fan-input__label"
        },
        _toDisplayString(_ctx.label),
        5
        /* TEXT, STYLE */
      )) : _createCommentVNode("v-if", true),
      _createElementVNode("input", {
        class: _normalizeClass(["fan-input", [
          { "fan-input--disabled": _ctx.disabled },
          { "fan-input--unreal": _ctx.disabled || _ctx.readonly }
        ]]),
        type: _ctx.type,
        value: _ctx.innerValue,
        readonly: _ctx.readonly,
        disabled: _ctx.disabled || _ctx.readonly,
        autofocus: _ctx.autofocus ? "autofocus" : "",
        style: _normalizeStyle(_ctx.inStyle),
        placeholder: _ctx.placeholder,
        "placeholder-style": `color:${_ctx.placeholderColor};`,
        onBlur: _cache[0] || (_cache[0] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
        onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onChange: _cache[2] || (_cache[2] = ($event) => _ctx.handleChange("change")),
        onInput: _cache[3] || (_cache[3] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
        onKeyup: _cache[4] || (_cache[4] = _withKeys(($event) => _ctx.handleChange("confirm"), ["enter"])),
        onConfirm: _cache[5] || (_cache[5] = ($event) => _ctx.handleChange("confirm"))
      }, null, 46, _hoisted_1),
      _ctx.clearable && _ctx.innerValue && _ctx.focused ? (_openBlock(), _createBlock(_component_FanIcon, {
        key: 2,
        name: "close-circle-fill",
        color: "var(--fan-black-2)",
        size: 16,
        onClick: _ctx.onClear
      }, null, 8, ["onClick"])) : _createCommentVNode("v-if", true),
      _ctx.suffixIcon ? (_openBlock(), _createBlock(_component_FanIcon, {
        key: 3,
        name: _ctx.suffixIcon,
        color: _ctx.suffixColor,
        size: _ctx.suffixSize,
        style: { "margin-right": "4px" }
      }, null, 8, ["name", "color", "size"])) : _createCommentVNode("v-if", true)
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
