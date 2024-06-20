var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_textarea_sfc = require("./textarea-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_icon = __toESM(require("../icon/icon.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Textarea")[0],
  components: { FanIcon: import_icon.default },
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
    const theStyle = (0, import_vue.computed)(
      () => `--fan-textarea-placeholder-color:${props.placeholderColor};`
    );
    const labStyle = (0, import_vue.computed)(() => (0, import_utils.transformStyleSize)(props.labelStyle));
    const inStyle = (0, import_vue.computed)(() => (0, import_utils.transformStyleSize)(props.inputStyle));
    const limStyle = (0, import_vue.computed)(() => (0, import_utils.transformStyleSize)(props.limitStyle));
    const innerValue = (0, import_vue.ref)("");
    (0, import_vue.watch)(innerValue, (val) => {
      if (val !== props.modelValue)
        emit("update:modelValue", val);
      emit("input", val);
    });
    (0, import_vue.watch)(
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
const _hoisted_1 = { class: "fan-textarea__wrap" };
const _hoisted_2 = ["maxlength", "value", "placeholder-style", "placeholder", "readonly", "disabled"];
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: (0, import_vue2.normalizeClass)(["fan-textarea__body", { "fan-hairline--bottom": _ctx.border }])
    },
    [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        _ctx.prefixIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
          key: 0,
          name: _ctx.prefixIcon,
          color: _ctx.prefixColor,
          size: _ctx.prefixSize,
          "custom-style": "margin-right:4px;"
        }, null, 8, ["name", "color", "size"])) : (0, import_vue2.createCommentVNode)("v-if", true),
        _ctx.label ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
          "div",
          {
            key: 1,
            style: (0, import_vue2.normalizeStyle)(_ctx.labStyle),
            class: "fan-textarea__label"
          },
          (0, import_vue2.toDisplayString)(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : (0, import_vue2.createCommentVNode)("v-if", true),
        (0, import_vue2.createElementVNode)("textarea", {
          class: (0, import_vue2.normalizeClass)(["fan-textarea", { "fan-textarea--disabled": _ctx.disabled }]),
          maxlength: _ctx.maxLength,
          style: (0, import_vue2.normalizeStyle)(_ctx.inStyle),
          value: _ctx.innerValue,
          "placeholder-style": `color:${_ctx.placeholderColor};`,
          placeholder: _ctx.placeholder,
          readonly: _ctx.readonly,
          disabled: _ctx.disabled || _ctx.readonly,
          onInput: _cache[0] || (_cache[0] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
          onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
          onChange: _cache[3] || (_cache[3] = ($event) => _ctx.handleChange("change")),
          onKeyup: _cache[4] || (_cache[4] = (0, import_vue2.withKeys)(($event) => _ctx.handleChange("confirm"), ["enter"])),
          onConfirm: _cache[5] || (_cache[5] = ($event) => _ctx.handleChange("confirm"))
        }, null, 46, _hoisted_2)
      ]),
      _ctx.maxLength > 0 && _ctx.showWordLimit ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 0,
          style: (0, import_vue2.normalizeStyle)(_ctx.limStyle),
          class: "fan-textarea__limit"
        },
        (0, import_vue2.toDisplayString)(_ctx.innerValue.length > _ctx.maxLength ? _ctx.maxLength : _ctx.innerValue.length) + "/" + (0, import_vue2.toDisplayString)(_ctx.maxLength > 0 ? _ctx.maxLength : 0),
        5
        /* TEXT, STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
