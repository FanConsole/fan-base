import "./textarea-sfc.css";
import { defineComponent, computed, ref, watch } from "vue";
import { createNamespace, transformStyleSize } from "../utils";
import FanIcon from "../icon/icon.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Textarea")[0],
  components: { FanIcon },
  props: {
    label: String,
    labelStyle: String,
    inputStyle: String,
    limitStyle: String,
    placeholder: String,
    placeholderColor: {
      type: String,
      default: "#C4C7CC"
    },
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
    maxLength: {
      type: [String, Number],
      default: -1
    },
    showWordLimit: {
      type: Boolean,
      default: false
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
    border: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: ["update:modelValue", "input", "change", "confirm", "blur", "focus"],
  setup(props, { emit }) {
    const theStyle = computed(
      () => `--fan-textarea-placeholder-color:${props.placeholderColor};`
    );
    const labStyle = computed(() => transformStyleSize(props.labelStyle));
    const inStyle = computed(() => transformStyleSize(props.inputStyle));
    const limStyle = computed(() => transformStyleSize(props.limitStyle));
    const innerValue = ref("");
    watch(innerValue, (val) => {
      if (val !== props.modelValue)
        emit("update:modelValue", val);
      emit("input", val);
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    const handleInput = (e) => innerValue.value = e.target.value;
    const onFocus = (e) => emit("focus", e);
    const onBlur = (e) => emit("blur", e);
    const handleChange = (e) => emit(e, innerValue.value);
    return {
      theStyle,
      labStyle,
      inStyle,
      limStyle,
      innerValue,
      handleInput,
      onFocus,
      onBlur,
      handleChange
    };
  }
});
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createElementBlock as _createElementBlock, withKeys as _withKeys, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = { class: "fan-textarea__wrap" };
const _hoisted_2 = ["maxlength", "value", "placeholder-style", "placeholder", "readonly", "disabled"];
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: _normalizeClass(["fan-textarea__body", { "fan-hairline--bottom": _ctx.border }])
    },
    [
      _createElementVNode("div", _hoisted_1, [
        _ctx.prefixIcon ? (_openBlock(), _createBlock(_component_FanIcon, {
          key: 0,
          name: _ctx.prefixIcon,
          color: _ctx.prefixColor,
          size: _ctx.prefixSize,
          "custom-style": "margin-right:4px;"
        }, null, 8, ["name", "color", "size"])) : _createCommentVNode("v-if", true),
        _ctx.label ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 1,
            style: _normalizeStyle(_ctx.labStyle),
            class: "fan-textarea__label"
          },
          _toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : _createCommentVNode("v-if", true),
        _createElementVNode("textarea", {
          class: _normalizeClass(["fan-textarea", { "fan-textarea--disabled": _ctx.disabled }]),
          maxlength: _ctx.maxLength,
          style: _normalizeStyle(_ctx.inStyle),
          value: _ctx.innerValue,
          "placeholder-style": `color:${_ctx.placeholderColor};`,
          placeholder: _ctx.placeholder,
          readonly: _ctx.readonly,
          disabled: _ctx.disabled || _ctx.readonly,
          onInput: _cache[0] || (_cache[0] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
          onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
          onChange: _cache[3] || (_cache[3] = ($event) => _ctx.handleChange("change")),
          onKeyup: _cache[4] || (_cache[4] = _withKeys(($event) => _ctx.handleChange("confirm"), ["enter"])),
          onConfirm: _cache[5] || (_cache[5] = ($event) => _ctx.handleChange("confirm"))
        }, null, 46, _hoisted_2)
      ]),
      _ctx.maxLength > 0 && _ctx.showWordLimit ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          style: _normalizeStyle(_ctx.limStyle),
          class: "fan-textarea__limit"
        },
        _toDisplayString(_ctx.innerValue.length > _ctx.maxLength ? _ctx.maxLength : _ctx.innerValue.length) + "/" + _toDisplayString(_ctx.maxLength > 0 ? _ctx.maxLength : 0),
        5
        /* TEXT, STYLE */
      )) : _createCommentVNode("v-if", true)
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
