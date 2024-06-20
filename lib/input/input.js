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
var import_input_sfc = require("./input-sfc.css");
var import_vue = require("vue");
var import_icon = __toESM(require("../icon/icon.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Input")[0],
  components: { FanIcon: import_icon.default },
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
    const theStyle = (0, import_vue.computed)(
      () => `--fan-input-placeholder-color:${props.placeholderColor};`
    );
    const inStyle = (0, import_vue.computed)(() => (0, import_utils.transformStyleSize)(props.inputStyle));
    const labStyle = (0, import_vue.computed)(() => (0, import_utils.transformStyleSize)(props.labelStyle));
    const innerValue = (0, import_vue.ref)("");
    (0, import_vue.watch)(innerValue, (val) => {
      if (val !== props.modelValue)
        context.emit("update:modelValue", val);
      context.emit("input", val);
    });
    (0, import_vue.watch)(
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
    const focused = (0, import_vue.ref)(false);
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
const _hoisted_1 = ["type", "value", "readonly", "disabled", "autofocus", "placeholder", "placeholder-style"];
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: (0, import_vue2.normalizeClass)(["fan-input__wrap", { "fan-hairline--bottom": _ctx.border }])
    },
    [
      _ctx.prefixIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
        key: 0,
        name: _ctx.prefixIcon,
        color: _ctx.prefixColor,
        size: _ctx.prefixSize,
        style: { "margin-right": "4px" }
      }, null, 8, ["name", "color", "size"])) : (0, import_vue2.createCommentVNode)("v-if", true),
      _ctx.label ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 1,
          style: (0, import_vue2.normalizeStyle)(_ctx.labStyle),
          class: "fan-input__label"
        },
        (0, import_vue2.toDisplayString)(_ctx.label),
        5
        /* TEXT, STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      (0, import_vue2.createElementVNode)("input", {
        class: (0, import_vue2.normalizeClass)(["fan-input", [
          { "fan-input--disabled": _ctx.disabled },
          { "fan-input--unreal": _ctx.disabled || _ctx.readonly }
        ]]),
        type: _ctx.type,
        value: _ctx.innerValue,
        readonly: _ctx.readonly,
        disabled: _ctx.disabled || _ctx.readonly,
        autofocus: _ctx.autofocus ? "autofocus" : "",
        style: (0, import_vue2.normalizeStyle)(_ctx.inStyle),
        placeholder: _ctx.placeholder,
        "placeholder-style": `color:${_ctx.placeholderColor};`,
        onBlur: _cache[0] || (_cache[0] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
        onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onChange: _cache[2] || (_cache[2] = ($event) => _ctx.handleChange("change")),
        onInput: _cache[3] || (_cache[3] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
        onKeyup: _cache[4] || (_cache[4] = (0, import_vue2.withKeys)(($event) => _ctx.handleChange("confirm"), ["enter"])),
        onConfirm: _cache[5] || (_cache[5] = ($event) => _ctx.handleChange("confirm"))
      }, null, 46, _hoisted_1),
      _ctx.clearable && _ctx.innerValue && _ctx.focused ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
        key: 2,
        name: "close-circle-fill",
        color: "var(--fan-black-2)",
        size: 16,
        onClick: _ctx.onClear
      }, null, 8, ["onClick"])) : (0, import_vue2.createCommentVNode)("v-if", true),
      _ctx.suffixIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
        key: 3,
        name: _ctx.suffixIcon,
        color: _ctx.suffixColor,
        size: _ctx.suffixSize,
        style: { "margin-right": "4px" }
      }, null, 8, ["name", "color", "size"])) : (0, import_vue2.createCommentVNode)("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
